import Link from 'next/link'
import * as React from 'react'
import {
  LuFacebook,
  LuGithub,
  LuGitlab,
  LuLinkedin,
  LuTwitter,
} from 'react-icons/lu'

import { cn } from '@/lib/utils'

type FooterLayoutProps = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>
const FooterHomePage = ({
  className,
  ...props
}: FooterLayoutProps) => {
  return (
    <footer
      className={cn('   bottom-0 z-50 bg-secondary pb-6 pt-8', className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="hidden flex-wrap text-left md:flex lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <h4 className="fonat-semibold text-3xl text-foreground">
              Venha conhecer as melhores soluções!
            </h4>
            <h5 className="mb-2 mt-0 text-lg font-extralight text-foreground">
              Nos encontre em uma dessas plataformas, iremos responder no máximo
              1-2 dias
            </h5>
            <div className="mb-6 mt-6 lg:mb-0">
              <button
                className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full font-normal text-foreground shadow-lg outline-none focus:outline-none"
                type="button"
              >
                <LuTwitter size={36} />{' '}
              </button>

              <button
                className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full font-normal text-foreground shadow-lg outline-none focus:outline-none"
                type="button"
              >
                <LuLinkedin size={36} />{' '}
              </button>
              <button
                className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full font-normal text-foreground shadow-lg outline-none focus:outline-none"
                type="button"
              >
                <LuGitlab size={36} />{' '}
              </button>
              <button
                className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full  font-normal text-foreground shadow-lg outline-none focus:outline-none"
                type="button"
              >
                <LuFacebook size={36} />{' '}
              </button>

              <button
                className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full  font-normal text-foreground shadow-lg outline-none focus:outline-none"
                type="button"
              >
                <LuGithub size={36} />{' '}
              </button>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="items-top mb-6 flex flex-wrap">
              <div className="ml-auto w-full px-4 lg:w-4/12">
                <span className="mb-2 block text-sm font-semibold uppercase text-muted-foreground">
                  Links Úteis
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60 "
                      href="/about"
                    >
                      Sobre Nós
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60 "
                      href="https://blog.creative-tim.com?ref=njs-profile"
                    >
                      Apresentação
                    </Link>
                  </li>
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60"
                      href="https://www.github.com/creativetimofficial?ref=njs-profile"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60"
                      href="#"
                    >
                      Nossas soluções
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full px-4 lg:w-4/12">
                <span className="mb-2 block text-sm font-semibold uppercase text-muted-foreground">
                  Outros Recursos
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60"
                      href="/portifolio"
                    >
                      Portifólio
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60"
                      href="/src/app/(public)/terms/page.tsx"
                    >
                      Termos &amp; Condições
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60"
                      href="/src/app/(public)/privacy/page.tsx"
                    >
                      Políticas de privacidade
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block pb-2 text-sm font-semibold text-foreground hover:text-primary/60"
                      href="/contact"
                    >
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 hidden border-foreground/60 md:block" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center md:w-4/12">
            <div className="py-1 text-sm font-semibold text-foreground">
              Copyright © <span id="get-current-year">2024</span>
              <Link
                href="https://github.com/RonyCode/gso-next"
                className="text-foreground hover:text-primary/60"
                target="_blank"
              >
                {' '}
                GSO{' '}
              </Link>
              by{' '}
              <Link
                href="https://github.com/RonyCode"
                className="text-foreground hover:text-primary/60"
              >
                Ronycod
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default FooterHomePage
