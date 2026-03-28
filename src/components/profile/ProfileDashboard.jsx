import { User, Mail, ShieldCheck, MapPin } from "lucide-react";

const ProfileDashboard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bento-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative bg-white">
      {/* Background Decor (Minimalist) */}
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-br from-emerald-50 to-gray-50 rounded-t-3xl border-b border-gray-100" />

      {/* Profile Photo */}
      <div className="relative shrink-0 z-10 w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 mt-8 md:mt-12">
        <div className="absolute inset-0 rounded-full border-4 border-white shadow-md p-1 bg-white">
          <img 
            src={user.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300"} 
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover bg-gray-100"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="flex-1 w-full z-10 text-center md:text-left md:mt-12">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{user.name}</h1>
          <span className="flex items-center gap-1.5 justify-center bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm w-fit mx-auto md:mx-0">
            <ShieldCheck className="w-3.5 h-3.5" /> ID Verified
          </span>
        </div>

        <div className="space-y-3 text-gray-600 font-medium">
          <p className="flex items-center justify-center md:justify-start gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100 shadow-inner">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100 shadow-inner">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <span>Kolkata, India</span>
          </p>
        </div>
      </div>

      {/* Small Stats Box */}
      <div className="w-full md:w-auto z-10 shrink-0 grid grid-cols-2 md:grid-cols-1 gap-4 md:mt-12">
        <div className="bg-white border border-gray-100 shadow-sm p-5 rounded-2xl text-center flex flex-col justify-center transition-shadow hover:shadow-md">
          <span className="text-3xl font-black text-emerald-600">12</span>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Listings</span>
        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-5 rounded-2xl text-center flex flex-col justify-center transition-shadow hover:shadow-md">
          <span className="text-3xl font-black text-gray-900">4.8</span>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Rating</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
