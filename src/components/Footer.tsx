import { ArrowUpRight, Heart } from "lucide-react";
import { navigation, siteConfig } from "@/lib/config";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand light />
            <p>
              Little gifts. Lasting impressions.
              <br />A sweeter way to say you care.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#faq">FAQ</a>
          </nav>
          <div className="footer-invitation">
            <span>Let’s make someone’s day.</span>
            <a href="#quote">
              Start something sweet{" "}
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. A little joy,
            thoughtfully given. <Heart size={12} aria-hidden="true" />
          </p>
          <p>
            <span className="demo-dot" />
            Partner demo <span className="footer-divider">/</span> Prices in CAD{" "}
            <span className="footer-divider">/</span> No orders processed online
          </p>
        </div>
      </div>
    </footer>
  );
}
