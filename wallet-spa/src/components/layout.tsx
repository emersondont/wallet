
interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <main className="font-Inter w-full h-screen flex p-3 justify-center items-center bg-gradient-to-l from-primary to-secondary">
      <div className="bg-background text-text rounded-xl p-6">
        {props.children}
      </div>
    </main>
  );
}