import TextEditor from "@/ui/components/TextEditor";

export default function Home() {
  return (
    <main className="flex-column h-full">
      <h1 className="heading mb-5">Editor</h1>
      <TextEditor />
    </main>
  );
}
