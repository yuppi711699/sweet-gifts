import { Gift } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand${light ? " brand-light" : ""}`}
      href="#top"
      aria-label={`${siteConfig.name} home`}
    >
      <span className="brand-mark">
        <Gift size={23} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span>
        {siteConfig.name}
        <span className="brand-period">.</span>
      </span>
    </a>
  );
}
