import React from 'react';
import {
  Badge,
  Header as DSFRHeader,
  HeaderBody,
  Logo,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
} from '@dataesr/react-dsfr';
import Link from 'next/link';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useStore } from '../../frontend/stores';

function Header() {
  const { currentAnswers, reset } = useStore();
  const router = useRouter();
  return (
    <DSFRHeader>
      <HeaderBody>
        <Logo splitCharacter={10}>République Française</Logo>
        <Service
          title={
            <>
              La bonne rénov&lsquo;
              <Badge text="Bêta" colorFamily="green-emeraude" />
            </>
          }
          description="Mesurer l’impact des travaux de rénovation énergétique"
          asLink={<Link href="/" title="Revenir à l'accueil" />}
        />
        <Tool>
          <ToolItemGroup>
            {currentAnswers.length > 0 && (
              <ToolItem onClick={() => reset(router)} icon="ri-arrow-left-line">
                Recommencer la simulation
              </ToolItem>
            )}
          </ToolItemGroup>
        </Tool>
      </HeaderBody>
    </DSFRHeader>
  );
}

export default observer(Header);
