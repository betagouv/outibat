import React from 'react';
import {
  Footer as FooterDSFR,
  FooterBody,
  FooterBottom,
  FooterCopy,
  FooterLink,
  Logo,
} from '@dataesr/react-dsfr';
import Link from 'next/link';

function Footer() {
  return (
    <FooterDSFR>
      <FooterBody description="Mesurer l’impact des travaux de rénovation énergétique">
        <Logo
          splitCharacter={10}
          asLink={<Link href="/" title="Revenir à l'accueil" />}
        >
          République Française
        </Logo>
      </FooterBody>
      <FooterBottom>
        <FooterLink>Accessibilité: non conforme</FooterLink>
        <FooterLink target="_blank" href="https://github.com/betagouv/outibat">
          Github
        </FooterLink>
        <FooterCopy>
          Sauf mention contraire, tous les contenus de ce site sont sous{' '}
          <Link
            href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
            target="_blank"
            rel="noreferrer"
          >
            licence etalab-2.0
          </Link>
        </FooterCopy>
      </FooterBottom>
    </FooterDSFR>
  );
}

export default Footer;
