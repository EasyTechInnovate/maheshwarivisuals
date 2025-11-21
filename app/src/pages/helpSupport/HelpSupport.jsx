import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Eye, 
  MessageCircle, 
  Mail, 
  Phone, 
  Play, 
  FileText, 
  Users,
  Clock,
  AlertCircle,
  Plus,
  Ticket,
  CheckCircle,
  AlertTriangle,
  Star,
} from 'lucide-react';
import {
  createSupportTicket,
  getMyTickets,
  getMyTicketStats,
  getTicketById,
  addTicketResponse,
  addTicketRating,
  getFaqs
} from '@/services/api.services';
import toast from 'react-hot-toast';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [modalState, setModalState] = useState({ type: null, ticket: null });
  const [openFAQ, setOpenFAQ] = useState(null);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/10';
      case 'in progress':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/10';
      case 'resolved':
        return 'bg-green-500/10 text-green-700 border-green-500/10';
      case 'closed':
        return 'bg-gray-500/10 text-gray-700 border-gray-500/10';
      case 'rejected':
        return 'bg-red-500/10 text-red-700 border-red-500/10';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-700 border-red-500/10';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/10';
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-500/10';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/10';
    }
  };

  // React Query
  const queryClient = useQueryClient();
  const [ticketFilters, setTicketFilters] = useState({ page: 1, limit: 10, status: 'open' });

  const ClaimModal = ({ title, children, trigger }) => (
    <Dialog >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-lg:min-w-[90vw] lg:min-w-6xl max-h-[90vh] overflow-y-auto  border-slate-700">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );

  const FormField = ({ label, children, required = false }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  // API Integrations with React Query
  const { data: ticketsData, isLoading: isLoadingTickets, isError: isTicketsError } = useQuery({
    queryKey: ['myTickets', ticketFilters],
    queryFn: () => getMyTickets(ticketFilters),
    keepPreviousData: true,
  });

  const { data: ticketStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['myTicketStats'],
    queryFn: getMyTicketStats,
  });

  const { data: faqsData, isLoading: isLoadingFaqs, isError: isFaqsError } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs,
  });

  const { data: ticketDetails, isLoading: isLoadingTicketDetails } = useQuery({
    queryKey: ['ticketDetails', modalState.ticket?.ticketId],
    queryFn: () => getTicketById(modalState.ticket.ticketId),
    enabled: !!modalState.ticket && modalState.type === 'details', // Only fetch when a ticket is selected and details modal is open
  });

  const createTicketMutation = useMutation({
    mutationFn: createSupportTicket,
    onSuccess: () => {
      toast.success('Support ticket created successfully!');
      queryClient.invalidateQueries(['myTickets']);
      queryClient.invalidateQueries({ queryKey: ['myTicketStats'] });
      // Optionally reset form state here
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create ticket.');
    },
  });

  const addResponseMutation = useMutation({
    mutationFn: addTicketResponse,
    onSuccess: (data, variables) => {
      toast.success('Reply sent successfully!');
      queryClient.invalidateQueries({ queryKey: ['ticketDetails', variables.ticketId] });
      queryClient.invalidateQueries({ queryKey: ['myTickets'] });
      setModalState({ type: null, ticket: null });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to send reply.');
    },
  });

  const addRatingMutation = useMutation({
    mutationFn: addTicketRating,
    onSuccess: (data, variables) => {
      toast.success('Feedback submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['ticketDetails', variables.ticketId] });
      queryClient.invalidateQueries({ queryKey: ['myTickets'] });
      setModalState({ type: null, ticket: null });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit feedback.');
    },
  });

  const filteredFaqs = React.useMemo(() => {
    if (!faqsData?.data?.faqsByCategory) {
      return {};
    }

    if (!faqSearchQuery) {
      return faqsData.data.faqsByCategory;
    }

    const lowercasedQuery = faqSearchQuery.toLowerCase();
    const filtered = {};

    for (const category in faqsData.data.faqsByCategory) {
      const questions = faqsData.data.faqsByCategory[category];
      const filteredQuestions = questions.filter(faq =>
        faq.question.toLowerCase().includes(lowercasedQuery) ||
        faq.answer.toLowerCase().includes(lowercasedQuery)
      );

      if (filteredQuestions.length > 0) {
        filtered[category] = filteredQuestions;
      }
    }
    return filtered;
  }, [faqsData, faqSearchQuery]);

  const handleCreateTicket = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    // Basic validation
    if (!data.subject || !data.description || !data.category) {
      toast.warning('Please fill all required fields.');
      return;
    }
    createTicketMutation.mutate(data);
  };

  const tickets = ticketsData?.data?.tickets || [];
  const pagination = ticketsData?.data?.pagination || {};

  const TicketDetailModal = ({ ticket }) => (
    <Dialog open={modalState.type === 'details'} onOpenChange={() => setModalState({ type: null, ticket: null })}>
      <DialogContent className="max-w-2xl  border-slate-700">
        <DialogHeader>
          <DialogTitle>Ticket Details</DialogTitle>
        </DialogHeader>
        {ticket && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Ticket ID</p>
                <p className="font-semibold">{ticket.ticketId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Priority</p>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Created</p>
                <p>{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            </div>
            {isLoadingTicketDetails && <p>Loading details...</p>}
            {ticketDetails?.data && (
              <div className="space-y-3 pt-2">
                <div>
                  <p className="text-muted-foreground mb-1">Subject</p>
                  <p className="font-semibold">{ticketDetails.data.subject}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Description</p>
                  <p className="p-3 bg-muted-foreground/10 rounded-md">{ticketDetails.data.description}</p>
                </div>
                {/* TODO: Render responses and attachments */}
              </div>
            )}
            <div className="flex gap-2 pt-4">
              <Button 
                className="bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => setModalState({ type: 'reply', ticket })}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Reply
              </Button>
              {(ticket.status === 'resolved' || ticket.status === 'closed') && (
                <Button 
                  variant="outline"
                  onClick={() => setModalState({ type: 'rating', ticket })}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Give Feedback
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const ReplyModal = ({ ticket }) => {
    const handleReplySubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const message = formData.get('message');
      if (!message?.trim()) {
        toast.error('Reply message cannot be empty.');
        return;
      }
      addResponseMutation.mutate({
        ticketId: ticket.ticketId,
        responseData: { message },
      });
    };

    return (
      <Dialog open={modalState.type === 'reply'} onOpenChange={() => setModalState({ type: null, ticket: null })}>
        <DialogContent className="max-w-lg border-slate-700">
          <DialogHeader>
            <DialogTitle>Reply to Ticket: {ticket?.ticketId}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <FormField label="Your Message" required>
              <Textarea
                name="message"
                placeholder="Type your reply here..."
                className="border-slate-700 min-h-[150px]"
              />
            </FormField>
            {/* TODO: Add attachment functionality if needed */}
            <Button type="submit" disabled={addResponseMutation.isLoading} className="w-full bg-purple-600 text-white hover:bg-purple-700">
              {addResponseMutation.isLoading ? 'Sending...' : 'Send Reply'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const RatingModal = ({ ticket }) => {
    const [rating, setRating] = useState(0);

    const handleRatingSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const feedback = formData.get('feedback');
      if (rating === 0) {
        toast.error('Please select a rating.');
        return;
      }
      addRatingMutation.mutate({
        ticketId: ticket.ticketId,
        ratingData: { rating, feedback },
      });
    };

    return (
      <Dialog open={modalState.type === 'rating'} onOpenChange={() => setModalState({ type: null, ticket: null })}>
        <DialogContent className="max-w-lg border-slate-700">
          <DialogHeader>
            <DialogTitle>Rate Support for Ticket: {ticket?.ticketId}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRatingSubmit} className="space-y-4">
            <FormField label="Rating" required>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`cursor-pointer ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} onClick={() => setRating(star)} />
                ))}
              </div>
            </FormField>
            <FormField label="Feedback (Optional)">
              <Textarea name="feedback" placeholder="Tell us about your experience..." className="border-slate-700 min-h-[120px]" />
            </FormField>
            <Button type="submit" disabled={addRatingMutation.isLoading} className="w-full bg-purple-600 text-white hover:bg-purple-700">
              {addRatingMutation.isLoading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Help & Support</h1>
              <p>Get help and submit support tickets</p>
            </div>
            <Button 
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => {
                setActiveTab('tickets');
                // Use a short timeout to ensure the tab content is rendered before scrolling
                setTimeout(() => {
                  document.getElementById('newticket')?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                  });
                }, 100);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <ClaimModal 
              title="Meta Claim Release"
              trigger={
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Meta Claim Release
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Account ID" required>
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Account">Account</SelectItem>
                      <SelectItem value="Content">Content</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mobile Number">
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Email Associated with Account">
                  <Input placeholder="your@email.com" className=" border-slate-700" />
                </FormField>
                <FormField label="Facebook / Instagram Video Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Meta Audio Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="ISRC of the Release" required>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                    <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </FormField>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="confirm-meta" className="rounded" />
                <label htmlFor="confirm-meta" className="text-sm">
                  I confirm that all submitted designs are original and do not infringe on third-party rights.
                </label>
              </div>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Submit Ticket
              </Button>
            </ClaimModal>

            <ClaimModal 
              title="Youtube Claim Release"
              trigger={
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Youtube Claim Release
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Account ID" required>
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mobile Number">
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Email Associated with Account">
                  <Input placeholder="your@email.com" className=" border-slate-700" />
                </FormField>
                <FormField label="Youtube Video Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Official Video Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="ISRC of the Release" required>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                    <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </FormField>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="confirm-youtube" className="rounded" />
                <label htmlFor="confirm-youtube" className="text-sm">
                  I confirm that all submitted designs are original and do not infringe on third-party rights.
                </label>
              </div>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Submit Ticket
              </Button>
            </ClaimModal>

            <ClaimModal 
              title="Youtube Manual Claiming Form"
              trigger={
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Youtube Manual Claim
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Account ID" required>
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mobile Number">
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Email Associated with Account">
                  <Input placeholder="your@email.com" className=" border-slate-700" />
                </FormField>
                <FormField label="Youtube Video Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Official Video Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="ISRC of the Release" required>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                    <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </FormField>
                <FormField label="Start Date">
                  <Input type="date" className=" border-slate-700" />
                </FormField>
                <FormField label="End Date">
                  <Input type="date" className=" border-slate-700" />
                </FormField>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="confirm-manual" className="rounded" />
                <label htmlFor="confirm-manual" className="text-sm">
                  I confirm that all submitted designs are original and do not infringe on third-party rights.
                </label>
              </div>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Submit Ticket
              </Button>
            </ClaimModal>

            <ClaimModal 
              title="Meta Profile/Page Mapping"
              trigger={
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Meta Profile Form
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Account ID" required>
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mobile Number">
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Email Associated with Account">
                  <Input placeholder="your@email.com" className=" border-slate-700" />
                </FormField>
                <FormField label="Which Profile/page do you want to Map?">
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Both" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profile">Profile</SelectItem>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <div></div>
                <FormField label="Youtube Video Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="ISRC of the Release" required>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                    <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </FormField>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="confirm-meta-profile" className="rounded" />
                <label htmlFor="confirm-meta-profile" className="text-sm">
                  I confirm that all submitted designs are original and do not infringe on third-party rights.
                </label>
              </div>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Submit Ticket
              </Button>
            </ClaimModal>
            
            {/* NEWLY ADDED CODE */}
            <ClaimModal 
              title="Meta Manual Claiming Form"
              trigger={
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Meta Manual Claim
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <Input placeholder="Enter your full name" className="border-slate-700" />
                </FormField>
                <FormField label="Account ID" required>
                  <Input placeholder="Enter your account ID" className="border-slate-700" />
                </FormField>
                <FormField label="Mobile Number">
                  <Input placeholder="Enter your mobile number" className="border-slate-700" />
                </FormField>
                <FormField label="Email Associated with Account">
                  <Input placeholder="your@email.com" className="border-slate-700" />
                </FormField>
                <FormField label="Which Profile/Page Do you want to Map?">
                  <Select>
                    <SelectTrigger className="border-slate-700">
                      <SelectValue placeholder="Both" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profile">Profile</SelectItem>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Release Date">
                  <Input type="date" className="border-slate-700" />
                </FormField>
                <FormField label="Youtube Video Link">
                  <Input placeholder="Link to the YouTube video" className="border-slate-700" />
                </FormField>
                <FormField label="ISRC of the Release" required>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Enter ISRC of the release" className="border-slate-700" />
                    <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </FormField>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="confirm-meta-manual" className="rounded" />
                <label htmlFor="confirm-meta-manual" className="text-sm">
                  I confirm that all submitted designs are original and do not infringe on third-party rights.
                </label>
              </div>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Submit Ticket
              </Button>
            </ClaimModal>
            {/* END OF NEWLY ADDED CODE */}

            <ClaimModal 
              title="Youtube Channel OAC / Release Mapping"
              trigger={
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Youtube OAC
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="Account ID" required>
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mobile Number">
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Email Associated with Account">
                  <Input placeholder="your@email.com" className=" border-slate-700" />
                </FormField>
                <FormField label="Which Profile/page do you want to Map?">
                  <Select>
                    <SelectTrigger className=" border-slate-700">
                      <SelectValue placeholder="OAC" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oac">OAC</SelectItem>
                      <SelectItem value="release">Release Mapping</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <div></div>
                <FormField label="Youtube OAC Link">
                  <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                </FormField>
                <FormField label="ISRC of the Release" required>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                    <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </FormField>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="confirm-oac" className="rounded" />
                <label htmlFor="confirm-oac" className="text-sm">
                  I confirm that all submitted designs are original and do not infringe on third-party rights.
                </label>
              </div>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Submit Ticket
              </Button>
            </ClaimModal>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="faq" >FAQ</TabsTrigger>
            <TabsTrigger value="tickets" >My Tickets</TabsTrigger>
            <TabsTrigger value="contact" >Contact</TabsTrigger>
            <TabsTrigger value="resources" >Resources</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="mb-6">
              <Input
                placeholder="Search frequently asked questions..."
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="max-w-md border-slate-700"
              />
            </div>

            {isLoadingFaqs && <p>Loading FAQs...</p>}
            {isFaqsError && <p className="text-red-500">Error fetching FAQs.</p>}
            {!isLoadingFaqs && Object.keys(filteredFaqs).length === 0 && <p>No matching FAQs found.</p>}
            {filteredFaqs &&
              Object.entries(filteredFaqs).map(([category, questions], categoryIndex) => (
                <Card key={category} className=" border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        {/* You can add more sophisticated icon logic if needed */}
                        {categoryIndex === 0 && <Play className="w-4 h-4 text-white" />}
                        {categoryIndex === 1 && <FileText className="w-4 h-4 text-white" />}
                        {categoryIndex === 2 && <AlertCircle className="w-4 h-4 text-white" />}
                        {categoryIndex > 2 && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {questions.map((faq) => (
                      <Collapsible key={faq._id} open={openFAQ === faq._id} onOpenChange={() => setOpenFAQ(openFAQ === faq._id ? null : faq._id)}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left rounded-lg transition-colors hover:bg-muted-foreground/10">
                          <span>{faq.question}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openFAQ === faq._id ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-3 bg-muted-foreground/10 rounded-lg mt-1">
                          {faq.answer}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          {/* My Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            {/* Ticket Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className=" py-2 border-slate-700">
                <CardContent className="p-4">
                  {isLoadingStats ? <p>Loading...</p> : (
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm">Total Tickets</p>
                        <p className="text-2xl font-bold">{ticketStats?.data?.overallStats?.totalTickets || 0}</p>
                      </div>
                      <Ticket className="w-8 h-8" />
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className=" py-2 border-slate-700">
                <CardContent className="p-4">
                  {isLoadingStats ? <p>Loading...</p> : (
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm">Open</p>
                        <p className="text-2xl font-bold">{ticketStats?.data?.overallStats?.openTickets || 0}</p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-500" />
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className=" py-2 border-slate-700">
                <CardContent className="p-4">
                  {isLoadingStats ? <p>Loading...</p> : (
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm">In Progress</p>
                        <p className="text-2xl font-bold">{ticketStats?.data?.overallStats?.pendingTickets || 0}</p>
                      </div>
                      <Clock className="w-8 h-8 text-yellow-500" />
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className=" py-2 border-slate-700">
                <CardContent className="p-4">
                  {isLoadingStats ? <p>Loading...</p> : (
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm">Resolved</p>
                        <p className="text-2xl font-bold">{ticketStats?.data?.overallStats?.resolvedTickets || 0}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Ticket List (as cards) */}
            <Card className=" border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Tickets</CardTitle>
                {/* TODO: Add filters for status */}
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingTickets && <p>Loading tickets...</p>}
                {isTicketsError && <p className="text-red-500">Error fetching tickets.</p>}
                {!isLoadingTickets && tickets.length === 0 && <p>No tickets found.</p>}
                {tickets.map((ticket) => (
                  <div key={ticket._id} className="p-4 border border-slate-800 rounded-lg space-y-2">
                    <div className="flex flex-wrap gap-2 justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{ticket.subject}</span>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setModalState({ type: 'reply', ticket })}
                          className="bg-purple-600 text-white hover:bg-purple-700"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        {(ticket.status === 'resolved' || ticket.status === 'closed') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setModalState({ type: 'rating', ticket })}
                            className="border-slate-600"
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Feedback
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setModalState({ type: 'details', ticket });
                          }}
                          className="border-slate-600"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {(ticket.status === 'resolved' || ticket.status === 'closed') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setModalState({ type: 'rating', ticket })}
                            className="border-slate-600"
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Feedback
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span>ID: {ticket.ticketId}</span>
                      <span className="mx-2">•</span>
                      <span>Category: {ticket.category}</span>
                      <span className="mx-2">•</span>
                      <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>Agent: {ticket.agent}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-4">
                <span className="text-sm text-muted-foreground">
                  Page {pagination.currentPage || 0} of {pagination.totalPages || 0}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTicketFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={!pagination.hasPrevPage}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTicketFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={!pagination.hasNextPage}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Submit New Support Ticket */}
            <Card id='newticket' className=" border-slate-700">
              <CardHeader>
                <CardTitle>Submit New Support Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Subject" required>
                      <Input name="subject" placeholder="Brief description of your issue" className=" border-slate-700" />
                    </FormField>
                    <FormField label="Category" required>
                      <Select name="category">
                        <SelectTrigger className=" border-slate-700">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Billing">Billing</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Priority">
                      <Select name="priority" defaultValue="medium">
                        <SelectTrigger className=" border-slate-700">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Contact Email">
                      <Input name="contactEmail" placeholder="your@email.com" className=" border-slate-700" />
                    </FormField>
                  </div>
                  <FormField label="Description" required>
                    <Textarea 
                      name="description"
                      placeholder="Please provide detailed information about your issue..." 
                      className=" border-slate-700 min-h-[120px]"
                    />
                  </FormField>
                  <Button type="submit" disabled={createTicketMutation.isLoading} className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    {createTicketMutation.isLoading ? 'Submitting...' : 'Submit Ticket'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className=" border-slate-700 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                  <p className="mb-3">Get instant help from our support team</p>
                  <p className="text-sm mb-4">Mon-Fri: 9 AM - 6 PM IST</p>
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className=" border-slate-700 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                  <p className="mb-3">Send us a detailed message</p>
                  <p className="text-sm mb-4">Response within 24 hours</p>
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className=" border-slate-700 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                  <p className="mb-3">Speak directly with our team</p>
                  <p className="text-sm mb-4">Premium members only</p>
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Support Hours & Response Times */}
            <Card className=" border-slate-700">
              <CardHeader>
                <CardTitle>Support Hours & Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Support Hours</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 4:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Response Times</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Live Chat:</span>
                        <span>Instant - 5 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email Support:</span>
                        <span>Within 24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone Support:</span>
                        <span>Scheduled calls</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className=" border-slate-700 border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Emergency Support</h3>
                    <p className="mb-4">
                      For urgent issues affecting your releases or payments, contact our emergency support line.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Emergency Line
                      </Button>
                      <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Priority Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className=" border-slate-700 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">User Guides</h3>
                  <p className="mb-4">Step-by-step tutorials and documentation</p>
                  <Button className="w-full">
                    View Guides
                  </Button>
                </CardContent>
              </Card>

              <Card className=" border-slate-700 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quick Start</h3>
                  <p className="mb-4">Get started with your first release in minutes</p>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className=" border-slate-700 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="mb-4">Connect with other artists and creators</p>
                  <Button className="w-full">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Popular Resources */}
            <Card className=" border-slate-700">
              <CardHeader>
                <CardTitle>Popular Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "How to optimize your music for streaming platforms",
                  "Understanding royalty payments and splits",
                  "Best practices for music promotion and marketing",
                  "Setting up your artist profile and brand",
                  "Technical requirements for audio uploads",
                  "Getting your music on editorial playlists"
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted-foreground/10 transition-colors">
                    <span>{resource}</span>
                    <Button size="sm" variant="ghost">
                      <FileText className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card className=" border-slate-700">
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Uploading Your First Release", duration: "5:32", views: "12.5K views" },
                    { title: "Understanding Analytics Dashboard", duration: "8:15", views: "8.9K views" },
                    { title: "Setting Up Marketing Campaigns", duration: "12:41", views: "15.2K views" },
                    { title: "Maximizing Your Royalty Earnings", duration: "9:28", views: "11.7K views" }
                  ].map((video, index) => (
                    <div key={index} className="border p-4 rounded-lg overflow-hidden hover:transition-colors cursor-pointer">
                      <div className="aspect-[21/6] bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                        <Play className="w-12 h-12 text-purple-400" />
                      </div>
                      <div className="py-2">
                        <h4 className="font-semibold mb-1">{video.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span>{video.duration}</span>
                          <span>{video.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Ticket Detail Modal */}
        <TicketDetailModal ticket={modalState.ticket} />
        <ReplyModal ticket={modalState.ticket} />
        <RatingModal ticket={modalState.ticket} />
      </div>
    </div>
  );
};

export default HelpSupport;