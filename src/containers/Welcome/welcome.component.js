import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeDetail,
  WelcomeName,
  ImageWrapper
} from './welcome.style';
import { ImageProfile } from '@components';
import { errorToaster } from '@utils';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { webId, image, updatePhoto, name } = props;
  const { t } = useTranslation();
  const limit = 2100000;
  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="/img/logo-UTFPR.jpg" alt="UTFPR" />
        </WelcomeLogo>
        <WelcomeProfile data-testid="welcome-profile">
          <h3>
            {t('welcome.welcome')}, <WelcomeName>{name}</WelcomeName>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split('/card')[0],
                limitFiles: 1,
                limitSize: limit,
                accept: 'jpg,jpeg,png',
                errorsText: {
                  sizeLimit: t('welcome.errors.sizeLimit', {
                    limit: `${limit / 1000000}Mbs`
                  }),
                  unsupported: t('welcome.errors.unsupported'),
                  maximumFiles: t('welcome.errors.maximumFiles')
                },
                onError: error => {
                  if (error && error.statusText) {
                    errorToaster(error.statusText, t('welcome.errorTitle'));
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(
                    uploadedFiles[uploadedFiles.length - 1].uri,
                    t('welcome.uploadSuccess'),
                    t('welcome.successTitle')
                  );
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t('welcome.upload'),
                      uploadingText: t('welcome.uploadingText')
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </WelcomeProfile>
      </WelcomeCard>
      <WelcomeCard className="card">
        <WelcomeDetail data-testid="welcome-detail">
          <h3>
            Eu quero OPTATIVA
          </h3>
          <p> Aplicação desenvolvida por alunos do curso de Engenharia de Computação com objetivo de balancear a oferta e demanda de disciplinas optativas.</p>
          <h3>Demonstrar interesse</h3>
            <ul>
              <li>
                Através dessa aplicação você pode demonstrar interesse em uma optativa que deseja cursar no próximo semestre.
              </li>
              <li>
                Os interesses dos alunos nas disciplinas serão encaminhados para a coordenação do curso.
              </li>
              <li>
                A coordenação poderá usar a informação das demandas para definir quais optativas serão oferecidas no próximo semestre letivo.
              </li>
            </ul>
          <h3>Desenvolvedores</h3>
            <ul>
              <li>
                Gustavo Morais
              </li>
              <li>
                Terumi Isobe
              </li>
              <li>
                Thiago Bispo
              </li>
              <li>
                Willian de Lima
              </li>
            </ul>
        </WelcomeDetail>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};
