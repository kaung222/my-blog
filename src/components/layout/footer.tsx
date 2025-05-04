import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="font-serif text-2xl font-bold">Thoughtfully</h2>
            <p className="max-w-xs mt-4 text-sm text-muted-foreground">
              Explore insights, stories, and perspectives on a variety of topics from technology to lifestyle.
            </p>
            <div className="flex mt-8 space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-medium">Quick Links</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-medium">Categories</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="/category/technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/travel" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Travel
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/lifestyle" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Lifestyle
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/food" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Food
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Subscribe to Newsletter</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Get the latest posts delivered right to your inbox.
              </p>
              <div className="mt-4 flex max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-muted">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Thoughtfully. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}