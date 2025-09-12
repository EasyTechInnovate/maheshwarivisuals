import React, { useState } from 'react';
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
} from 'lucide-react';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  // FAQ Data
  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          id: 1,
          question: "How do I upload my first release?",
          answer: "To upload your first release, navigate to the 'Releases' section, click 'New Release', fill in all required information including track details, artwork, and distribution preferences, then submit for review."
        },
        {
          id: 2,
          question: "What audio formats are supported?",
          answer: "We support WAV, FLAC, MP3 (320kbps), and AIFF formats. For best quality, we recommend uploading in WAV or FLAC format."
        },
        {
          id: 3,
          question: "How long does it take for my music to go live?",
          answer: "Once approved, your music typically goes live across all platforms within 24-48 hours. Some platforms may take up to 5-7 business days."
        }
      ]
    },
    {
      category: "Royalties & Payments",
      questions: [
        {
          id: 4,
          question: "When do I get paid?",
          answer: "Royalty payments are processed monthly, typically by the 15th of each month for the previous month's earnings, provided you meet the minimum payout threshold."
        },
        {
          id: 5,
          question: "What is bonus royalty?",
          answer: "Bonus royalty is an additional percentage of earnings you can receive based on your subscription tier and performance milestones."
        },
        {
          id: 6,
          question: "How are royalties calculated?",
          answer: "Royalties are calculated based on streams, downloads, and other revenue sources minus platform fees. The exact percentage depends on your chosen plan."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          id: 7,
          question: "My upload is stuck or failed",
          answer: "If your upload fails, check your internet connection and file format. If the issue persists, try uploading during off-peak hours or contact support."
        },
        {
          id: 8,
          question: "I can't access my account",
          answer: "Try resetting your password first. If you still can't access your account, contact our support team with your registered email address."
        },
        {
          id: 9,
          question: "Audio quality issues after upload",
          answer: "Ensure your original file is high quality (WAV/FLAC recommended). Avoid multiple compressions and check that your master isn't clipping or distorted."
        }
      ]
    }
  ];

  // Sample ticket data
  const ticketData = [
    {
      id: 'TKT001',
      subject: 'Payment not processed',
      category: 'Billing',
      status: 'Open',
      priority: 'High',
      agent: 'Support Team',
      created: '1/15/2024',
      description: 'My monthly royalty payment was not processed on the expected date. Please investigate and resolve this issue.'
    },
    {
      id: 'TKT002',
      subject: 'Upload issue with large files',
      category: 'Technical',
      status: 'In Progress',
      priority: 'Medium',
      agent: 'Tech Support',
      created: '1/14/2024',
      description: 'Having trouble uploading files larger than 100MB. The upload keeps failing at around 80% completion.'
    },
    {
      id: 'TKT003',
      subject: 'Question about MCN application',
      category: 'General',
      status: 'Resolved',
      priority: 'Low',
      agent: 'Account Manager',
      created: '1/12/2024',
      description: 'Need clarification about the Multi-Channel Network application process and requirements.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/10';
      case 'in progress':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/10';
      case 'resolved':
        return 'bg-green-500/10 text-green-700 border-green-500/10';
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

  const TicketDetailModal = ({ ticket }) => (
    <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
      <DialogContent className="max-w-2xl  border-slate-700">
        <DialogHeader>
          <DialogTitle>Ticket Details</DialogTitle>
        </DialogHeader>
        {ticket && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Ticket ID</p>
                <p>{ticket.id}</p>
              </div>
              <div>
                <p className="text-sm">Status</p>
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm">Priority</p>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
              <div>
                <p className="text-sm">Created</p>
                <p>{ticket.created}</p>
              </div>
            </div>
            <div>
              <p className="text-sm mb-2">Subject</p>
              <p>{ticket.subject}</p>
            </div>
            <div>
              <p className="text-sm mb-2">Description</p>
              <p>{ticket.description}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Reply
              </Button>
              <Button variant="outline">
                View Details
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

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
              onClick={() => setActiveTab('tickets')}
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
                className="max-w-md border-slate-700"
              />
            </div>

            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex} className=" border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      {categoryIndex === 0 && <Play className="w-4 h-4 text-white" />}
                      {categoryIndex === 1 && <FileText className="w-4 h-4 text-white" />}
                      {categoryIndex === 2 && <AlertCircle className="w-4 h-4 text-white" />}
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {category.questions.map((faq) => (
                    <Collapsible key={faq.id} open={openFAQ === faq.id} onOpenChange={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left rounded-lg transition-colors hover:bg-muted-foreground/10">
                        <span>{faq.question}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
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
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm">Total Tickets</p>
                      <p className="text-2xl font-bold">{ticketData.length}</p>
                    </div>
                    <Ticket className="w-8 h-8" />
                  </div>
                </CardContent>
              </Card>
              <Card className=" py-2 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm">Open</p>
                      <p className="text-2xl font-bold">
                        {ticketData.filter(t => t.status === 'Open').length}
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className=" py-2 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm">In Progress</p>
                      <p className="text-2xl font-bold">
                        {ticketData.filter(t => t.status === 'In Progress').length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className=" py-2 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm">Resolved</p>
                      <p className="text-2xl font-bold">
                        {ticketData.filter(t => t.status === 'Resolved').length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ticket List (as cards) */}
            <Card className=" border-slate-700">
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ticketData.map((ticket) => (
                  <div key={ticket.id} className="p-4 border border-slate-800 rounded-lg space-y-2">
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
                          className="bg-purple-600 text-white hover:bg-purple-700"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setIsTicketModalOpen(true);
                          }}
                          className="border-slate-600"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span>ID: {ticket.id}</span>
                      <span className="mx-2">•</span>
                      <span>Category: {ticket.category}</span>
                      <span className="mx-2">•</span>
                      <span>Created: {ticket.created}</span>
                      <span className="mx-2">•</span>
                      <span>Agent: {ticket.agent}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit New Support Ticket */}
            <Card className=" border-slate-700">
              <CardHeader>
                <CardTitle>Submit New Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Subject" required>
                    <Input placeholder="Brief description of your issue" className=" border-slate-700" />
                  </FormField>
                  <FormField label="Category" required>
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
                  <FormField label="Priority">
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
                  <FormField label="Contact Email">
                    <Input placeholder="your@email.com" className=" border-slate-700" />
                  </FormField>
                </div>
                <FormField label="Description" required>
                  <Textarea 
                    placeholder="Please provide detailed information about your issue..." 
                    className=" border-slate-700 min-h-[120px]"
                  />
                </FormField>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  Submit Ticket
                </Button>
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
        <TicketDetailModal ticket={selectedTicket} />
      </div>
    </div>
  );
};

export default HelpSupport;