import KbEditor from "@/components/admin/KbEditor";

export default function AdminChatPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Chat IA — Base entrenable</h1>
        <p className="text-[#525252] text-sm mt-1">Edita <code className="text-white/60">kb/biyum.md</code> — cada cambio se usa al instante, sin reentrenar.</p>
      </div>
      <KbEditor />
    </div>
  );
}
