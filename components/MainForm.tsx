import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Callout,
  CalloutText,
  CalloutTitle,
} from '@dataesr/react-dsfr';
import { observer } from 'mobx-react';
import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStore } from '../frontend/stores';
import QuestionType from '../types/enum/questionType';
import { Question } from '../types/question';
import { FormContainer, Container, Step } from './MainForm.styles';
import CheckBox from './Form/CheckBox';
import Radio from './Form/Radio';
import Text from './Form/Text';
import YesNo from './Form/YesNo';
import Number from './Form/Number';
import Recap from './Recap';

const getQuestion = (
  question: Question,
  answer: (value: string | string[]) => void,
  showError: boolean
) => {
  switch (question.type) {
    case QuestionType.RADIO:
      return (
        <Radio question={question} answer={answer} showError={showError} />
      );
    case QuestionType.CHECKBOX:
      return (
        <CheckBox question={question} answer={answer} showError={showError} />
      );
    case QuestionType.TEXT:
      return <Text question={question} answer={answer} showError={showError} />;
    case QuestionType.YESNO:
      return (
        <YesNo question={question} answer={answer} showError={showError} />
      );
    case QuestionType.YESNOUNKNOWN:
      return (
        <YesNo
          question={question}
          answer={answer}
          showError={showError}
          withUnknown
        />
      );
    case QuestionType.NUMBER:
      return (
        <Number question={question} answer={answer} showError={showError} />
      );
    default:
      return <>Type inconnue</>;
  }
};

function MainForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { currentQuestion, answer, loading, stepInfo } = useStore();
  const [value, setValue] = useState<string | string[]>();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setValue(undefined);
  }, [currentQuestion]);

  useEffect(() => {
    setShowError(false);
  }, [value]);

  useEffect(() => {
    if (formRef.current) {
      // formRef.current.focus();
    }
  }, [formRef, currentQuestion]);

  const hasError = useMemo(() => {
    if (value === undefined || !currentQuestion) {
      return false;
    }

    return currentQuestion.validate && !currentQuestion.validate(value);
  }, [currentQuestion, value]);

  const next = (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (hasError) {
      setShowError(true);
    } else if (value !== undefined && currentQuestion) {
      answer(currentQuestion.id, value, router);
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLFormElement>) => {
    switch (e.key) {
      default:
        console.log(e.key);
        break;
    }
  };

  if (loading) {
    return <h2>Chargement de vos r??ponses en cours</h2>;
  }
  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem asLink={<Link href="/" />}>Accueil</BreadcrumbItem>
        <BreadcrumbItem>
          V??rifier qu???une pompe ?? chaleur est adapt??e ?? votre maison
        </BreadcrumbItem>
      </Breadcrumb>
      <FormContainer
        ref={formRef}
        onKeyUp={onKeyUp}
        tabIndex={0}
        onSubmit={next}
      >
        {currentQuestion ? (
          <>
            {stepInfo && <Step {...stepInfo} />}
            <h3>{currentQuestion.label}</h3>
            {getQuestion(currentQuestion, setValue, showError)}
            <ButtonGroup isInlineFrom="sm" className="fr-mb-2w">
              <Button
                submit
                disabled={value === undefined}
                icon="ri-arrow-right-line"
                iconPosition="right"
              >
                Continuer
              </Button>
            </ButtonGroup>
            <Callout>
              <CalloutTitle as="h4">Le saviez-vous ?</CalloutTitle>
              <CalloutText as="div">
                <b>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </b>
                <ul>
                  <li>
                    Dolor sed viverra ipsum nunc aliquet bibendum enim
                    facilisis. Elit ut aliquam purus sit amet luctus venenatis
                    lectus.
                  </li>
                  <li>
                    Diam volutpat commodo sed egestas egestas fringilla
                    phasellus faucibus scelerisque. Ultricies tristique nulla
                    aliquet enim tortor at auctor urna nunc.
                  </li>
                  <li>
                    Eget aliquet nibh praesent tristique magna sit amet purus
                    gravida.
                  </li>
                </ul>
              </CalloutText>
            </Callout>
          </>
        ) : (
          <Recap />
        )}
      </FormContainer>
    </Container>
  );
}

export default observer(MainForm);
