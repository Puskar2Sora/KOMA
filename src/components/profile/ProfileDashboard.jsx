import { User, Mail, ShieldCheck, MapPin } from "lucide-react";

const ProfileDashboard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
      {/* Background Neon Blur effect */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Profile Photo */}
      <div className="relative shrink-0 z-10 w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
        <div className="absolute inset-0 rounded-full border-[3px] border-purple-500/30 p-1">
          <img 
            src={user.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300"} 
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-white/5"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="flex-1 w-full z-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
          <h1 className="text-3xl font-black text-white">{user.name}</h1>
          <span className="flex items-center gap-1 justify-center bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30 w-fit mx-auto md:mx-0">
            <ShieldCheck className="w-3 h-3" /> Verified User
          </span>
        </div>

        <div className="space-y-3 mt-4 text-gray-300">
          <p className="flex items-center justify-center md:justify-start gap-3 glass-panel p-3 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
            <Mail className="w-5 h-5 text-purple-400 shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-3 glass-panel p-3 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
            <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
            <span>Kolkata, India</span> {/* Placeholder or user.location */}
          </p>
        </div>
      </div>

      {/* Small Stats Box */}
      <div className="w-full md:w-auto z-10 shrink-0 grid grid-cols-2 md:grid-cols-1 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-white/10 text-center flex flex-col justify-center">
          <span className="text-3xl font-black neon-text-primary">12</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Properties Listed</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/10 text-center flex flex-col justify-center">
          <span className="text-3xl font-black text-white">4.8</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Review Score</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
