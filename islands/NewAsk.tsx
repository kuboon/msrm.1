import { useCallback, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

export default function NewAsk() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [satoshi, setSatoshi] = useState(0);
  const onClick = useCallback(async () => {
    const res = await fetch("/my/asks", {
      method: "POST",
      body: JSON.stringify({ q, satoshi }),
    });
    if (!res.ok) return;
    const json = await res.json();
    window.location.href = `/my/asks/${json.id}`;
  }, [q, satoshi]);
  return (<>
  <Button onClick={()=>setOpen(true)} class="rounded-full bg-red-200">新規募集</Button>
    <dialog class="container bg-red-100 shadow" open={open}>
      質問:{" "}
      <input
        class="border"
        type="text"
        value={q}
        onInput={(e) => setQ(e.currentTarget.value)}
      />
      <br />
      satoshi:{" "}
      <input
        class="border"
        type="number"
        value={satoshi}
        onInput={(e) => setSatoshi(parseInt(e.currentTarget.value))}
      />
      <br />
      <input type="submit" value="Submit" onClick={onClick} />
    </dialog>
    </>
  );
}
