import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InviteTeamMemberModal from "@/components/team-management/InviteTeamMemberModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function TeamManagement({ theme }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingInvites: 0,
    inactiveTeamMembers: "-",
    avgResponseChange: "",
    members: [],
  });
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingMemberData, setEditingMemberData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    memberId: null,
    memberName: "",
  });


  const fetchTeamStats = async () => {
    try {
      const res = await GlobalApi.getTeamStatistics();
      const stats = res?.data?.data;

      setData((prev) => ({
        ...prev,
        totalMembers: stats?.totalTeamMembers ?? prev.totalMembers,
        activeMembers: stats?.activeTeamMembers ?? prev.activeMembers,
        pendingInvites: stats?.pendingInvitations ?? prev.pendingInvites,
        inactiveTeamMembers: stats?.inactiveTeamMembers ?? prev.inactiveTeamMembers,
        departmentDistribution: stats?.departmentDistribution ?? [],
        roleDistribution: stats?.roleDistribution ?? [],
      }));
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };



  const fetchTeamMembers = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const res = await GlobalApi.getAllTeamMembers(page, limit);
      const payload = res?.data?.data?.teamMembers ?? [];

      const mappedMembers = payload.map((m) => {
        const name = `${m.firstName ?? ""} ${m.lastName ?? ""}`.trim() || "-";
        const email = m.emailAddress ?? "-";
        const role = m.teamRole ?? m.role ?? "-";
        const department = m.department ?? "-";

        let status = "Inactive";
        if (m.isActive) status = "Active";
        else if (!m.isInvitationAccepted) status = "Pending";

        return {
          _id: m._id,
          name,
          email,
          role,
          department,
          status,
          isInvitationAccepted: m.isInvitationAccepted ?? false,
          joinDate: m.createdAt
            ? new Date(m.createdAt).toLocaleDateString()
            : "-",
          lastActive: m.loginInfo?.lastLogin
            ? new Date(m.loginInfo.lastLogin).toLocaleDateString()
            : "-",
          raw: m,
        };
      });


      setData((prev) => ({
        ...prev,
        members: mappedMembers,
      }));
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError("Failed to load team members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
    fetchTeamStats();
  }, []);

  const handleEditClick = async (id) => {
    try {
      const res = await GlobalApi.getTeamMemberById(id);
      const member = res?.data?.data;
      if (member) {
        setEditingMemberId(id);
        setEditingMemberData(member);
        setInviteModalOpen(true);
      }
    } catch (err) {
      console.error("Failed to fetch member by ID:", err);
    }
  };

  const handleCloseModal = () => {
    setInviteModalOpen(false);
    setEditingMemberId(null);
    setEditingMemberData(null);
  };


  const handleRemoveClick = (member) => {
    setConfirmDialog({
      isOpen: true,
      memberId: member._id,
      memberName: member.name,
    });
  };


  const confirmRemove = async () => {
    const { memberId, memberName } = confirmDialog;
    try {
      await GlobalApi.deleteTeamMember(memberId);
      toast.success(`Member "${memberName}" removed successfully`);
      setData((prev) => ({
        ...prev,
        members: prev.members.filter((m) => m._id !== memberId),
      }));
      fetchTeamStats();
    } catch (err) {
      console.error("Failed to delete member:", err);
      toast.error("Failed to remove member");
    } finally {
      setConfirmDialog({ isOpen: false, memberId: null, memberName: "" });
    }
  };

  const handleResendInvitation = async (memberId, memberName) => {
    try {
      await GlobalApi.resendTeamInvitation(memberId);
      toast.success(`Invitation resent to ${memberName}`);
    } catch (err) {
      console.error("Failed to resend invitation:", err);
      toast.error("Failed to resend invitation");
    }
  };


  const filteredMembers = data.members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#151F28]"
        }`}
    >

      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Team Management</h1>
          <p
            className={`${isDark ? "text-gray-400" : "text-gray-600"
              } text-sm`}
          >
            Manage team members, roles, permissions, and departments
          </p>
        </div>


        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full md:w-64 ${isDark
              ? "bg-[#151F28] border-gray-700 text-gray-200"
              : "bg-white"
              }`}
          />
          <select
            className={`rounded-md px-3 py-2 text-sm ${isDark
              ? "bg-[#151F28] border border-gray-700 text-gray-200"
              : "bg-white border border-gray-300"
              }`}
          >
            <option>All Roles</option>
          </select>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => {
              setEditingMemberId(null);
              setEditingMemberData(null);
              setInviteModalOpen(true);
            }}
          >
            Add Member
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Team Members", value: data.totalMembers },
          { label: "Active Members", value: data.activeMembers },
          { label: "Pending Invitations", value: data.pendingInvites },
          { label: "Inactive Members", value: data.inactiveTeamMembers },
        ].map((s, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 shadow-md flex flex-col justify-center ${isDark ? "bg-[#151F28]" : "bg-white"
              }`}
          >
            <p className="text-sm">{s.label}</p>
            <p className="text-2xl font-semibold">{s.value ?? "-"}</p>
          </div>
        ))}
      </div>



      <div
        className={`rounded-lg overflow-x-auto shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"
          }`}
      >
        {loading ? (
          <div className="p-6 text-center">Loading team members...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <table className="w-full text-sm min-w-[800px]">
            <thead
              className={`${isDark ? "text-gray-400" : "text-gray-600"
                } text-left`}
            >
              <tr>
                <th className="px-4 py-3 font-medium">Member</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Invitation</th>
                <th className="px-4 py-3 font-medium">Join Date</th>
                <th className="px-4 py-3 font-medium">Last Active</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m, idx) => (
                <tr
                  key={m._id ?? idx}
                  className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"
                    }`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">{m.department}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${m.status === "Active"
                        ? "bg-purple-600 text-white"
                        : m.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-500 text-white"
                        }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {m.isInvitationAccepted ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${isDark
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-700"
                          }`}
                      >
                        Accepted
                      </span>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${isDark
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        Pending
                      </span>
                    )}
                  </td>


                  <td className="px-4 py-3">{m.joinDate}</td>
                  <td className="px-4 py-3">{m.lastActive}</td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={isDark ? "outline" : "secondary"}
                      onClick={() => handleEditClick(m._id)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500"
                      onClick={() => handleRemoveClick(m)}
                    >
                      Remove
                    </Button>


                    {!m.isInvitationAccepted && (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleResendInvitation(m._id, m.name)}
                      >
                        Resend Invitation
                      </Button>
                    )}
                  </td>

                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>


      <InviteTeamMemberModal
        isOpen={isInviteModalOpen}
        onClose={handleCloseModal}
        theme={theme}
        memberId={editingMemberId}
        memberData={editingMemberData}
        onSuccess={() => {
          fetchTeamMembers();
          fetchTeamStats();
        }}
      />


      {confirmDialog.isOpen && (
        <ConfirmDialog
          title="Remove Team Member"
          message={`Are you sure you want to remove ${confirmDialog.memberName}? This action cannot be undone.`}
          onConfirm={confirmRemove}
          onCancel={() =>
            setConfirmDialog({ isOpen: false, memberId: null, memberName: "" })
          }
          theme={theme}
        />
      )}
    </div>
  );
}
