import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { namedNode } from '@rdfjs/data-model';
import { AccessControlList } from '@inrupt/solid-react-components';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import {
  ldflexHelper,
  errorToaster,
  successToaster,
  storageHelper,
  notification as helperNotification
} from '@utils';
import { GameFormWrapper, BtnDiv } from './game-form.styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
type Props = {
  webId: String,
  sendNotification: () => void,
  opponent: string,
  setOpponent: () => void
};

const GameForm = ({ webId, sendNotification, opponent, setOpponent }: Props) => {
  const uniqueIdentifier = Date.now();
  const [documentUri, setDocumentUri] = useState(`${uniqueIdentifier}.ttl`);
  const { t } = useTranslation();

  const reset = () => {
    setDocumentUri('');
    setOpponent('');
  };

  /**
   * Creates the initial game object based on the opponent's webId
   * @param {String} opponent Opponent's webId
   * @returns {Object} Game data
   */
  const initialGame = opponent => ({
    status: 'Invite Sent',
    created: moment().format(),
    actor: namedNode(webId),
    opponent: namedNode(opponent),
    initialState: 'X',
    move: ''
  });

  /**
   * Creates a game with the initial game object and sends a notification to the rival
   * @param {String} documentUri Game document's url
   * @param {String} opponent Opponent's webId
   */
  const createGame = async (documentUri: String, opponent: String) => {
    try {
      /**
       * Get full opponent game path
       */
      const appPath = await storageHelper.getAppStorage(opponent);
      const gameSettings = `${appPath}settings.ttl`;
      /**
       * Find opponent inboxes from a document link
       */
      const inboxes = await helperNotification.findUserInboxes([
        { path: opponent, name: 'Global' },
        { path: gameSettings, name: 'Game' }
      ]);
      /**
       * If opponent has at least one inbox, create a game and send a notification
       * Otherwise, show an error message
       * */
      if (inboxes.length > 0) {
        const newDocument = await ldflexHelper.createNonExistentDocument(documentUri);

        /**
         * If game already exist show an error message
         */
        if (!newDocument) {
          errorToaster(`${documentUri} ${t('game.alreadyExists')}`, t('notifications.error'));
          return null;
        }

        /**
         * If document was created we will initialize the game, otherwise show an error
         */
        if (newDocument.ok) {
          const document = await ldflexHelper.fetchLdflexDocument(documentUri);
          const setupObj = initialGame(opponent);

          for await (const field of tictactoeShape.shape) {
            const prefix = tictactoeShape['@context'][field.prefix];
            const predicate = `${prefix}${field.predicate}`;
            const obj = setupObj[field.predicate];
            if (obj || obj === '') await document[predicate].add(obj);
          }
          /**
           * Find the opponent's game-specific inbox. If it doesn't exist, get the global inbox instead
           * @to: Opponent inbox path
           */
          const to = helperNotification.getDefaultInbox(inboxes, 'Game', 'Global');
          const target = `${window.location.href}/${btoa(documentUri)}`;
          await sendNotification(
            {
              title: 'Tictactoe invitation',
              summary: 'has invited you to play Tic-Tac-Toe.',
              actor: webId,
              object: documentUri,
              target
            },
            to.path
          );

          setDocumentUri(`${Date.now()}.ttl`);

          return true;
        }
        errorToaster(`${opponent} ${t('game.createFolder.message')}`, t('notifications.error'));
        return null;
      }

      errorToaster(`${opponent} ${t('noInboxOpponent.message')}`, t('notifications.error'), {
        label: t('noInboxOpponent.link.label'),
        href: t('noInboxOpponent.link.href')
      });

      return null;
    } catch (e) {
      throw new Error(e);
    }
  };


  const universityCourses = [
    {
    courseCode : "EL68F",
    couseName : "Controle Supervisório",
    },
    {
    courseCode : "",
    couseName : "Controle Inteligente",
    },
    {
    courseCode : "",
    couseName : "Identificação de Sistemas",
    },
    {
    courseCode : "EL6AC",
    couseName : "Controle 3",
    },
    {
    courseCode : "",
    couseName : "Controle 4",
    },
    {
    courseCode : "",
    couseName : "Controle a Eventos Discretos",
    },
    {
    courseCode : "CSV30",
    couseName : "Processamento Digital de Imagens",
    },
    {
    courseCode : "",
    couseName : "Processamento Digital de Imagens 2",
    },
    {
    courseCode : "",
    couseName : "Introdução À Visão Computacional",
    },
    {
    courseCode : "",
    couseName : "Visão Computacional",
    },
    {
    courseCode : "CSV45",
    couseName : "Reconhecimento de Padrões em Imagens",
    },
    {
    courseCode : "",
    couseName : "Computação Gráfica",
    },
    {
    courseCode : "",
    couseName : "Tópicos Avançados em Processamento Gráfico",
    },
    {
    courseCode : "",
    couseName : "Fundamentos de Processamento de Imagens Médicas",
    },
    {
    courseCode : "",
    couseName : "IA Distribuída",
    },
    {
    courseCode : "",
    couseName : "Meta-heurísticas Inspiradas em Inteligência Coletiva",
    },
    {
    courseCode : "",
    couseName : "Sistemas Fuzzy",
    },
    {
    courseCode : "CSI41",
    couseName : "Redes Neurais",
    },
    {
    courseCode : "",
    couseName : "Computação Evolucionária",
    },
    {
    courseCode : "",
    couseName : "Ontologias",
    },
    {
    courseCode : "",
    couseName : "Sistemas Autônomos Inteligentes",
    },
    {
    courseCode : "CSI53",
    couseName : "Mineração de Dados",
    },
    {
    courseCode : "",
    couseName : "Algoritmos e Complexidade",
    },
    {
    courseCode : "",
    couseName : "Complexidade Computacional",
    },
    {
    courseCode : "",
    couseName : "Introdução à Criptografia",
    },
    {
    courseCode : "",
    couseName : "Computação Quântica",
    },
    {
    courseCode : "CSA42",
    couseName : "Teoria dos Grafos",
    },
    {
    courseCode : "CSA45",
    couseName : "Geometria Computacional",
    },
    {
    courseCode : "",
    couseName : "Projeto de Infra-Estrutura de Redes",
    },
    {
    courseCode : "",
    couseName : "Redes e Sistemas de Comunicação Móveis",
    },
    {
    courseCode : "CSR41",
    couseName : "Oficina de Redes",
    },
    {
    courseCode : "CSR42",
    couseName : "Infraestrutura de LANs Hierárquicas",
    },
    {
    courseCode : "CSR43",
    couseName : "Infraestrutura de WANs",
    },
    {
    courseCode : "CSR44",
    couseName : "Segurança de Redes e Sistemas",
    },
    {
    courseCode : "",
    couseName : "Redes sem Fio",
    },
    {
    courseCode : "",
    couseName : "Simul. e Análise de Desempenho de Redes de Computadores",
    },
    {
    courseCode : "EL6BF",
    couseName : "Comunicações sem Fio",
    },
    {
    courseCode : "CSE40",
    couseName : "Engenharia de Software 2",
    },
    {
    courseCode : "",
    couseName : "Engenharia de Requisitos",
    },
    {
    courseCode : "",
    couseName : "Metodologias Ágeis p/ o Desenvolvimento de SW",
    },
    {
    courseCode : "",
    couseName : "Testes, Verificação e Validação de  Sistemas",
    },
    {
    courseCode : "",
    couseName : "Sistemas Legados",
    },
    {
    courseCode : "",
    couseName : "Modelagem de Software",
    },
    {
    courseCode : "",
    couseName : "Gerenciamento de Projeto de Software",
    },
    {
    courseCode : "CSE47",
    couseName : "Gerência de Projetos",
    },
    {
    courseCode : "",
    couseName : "Qualidade de Software",
    },
    {
    courseCode : "CSM30",
    couseName : "Desenvolvimento Integrado de Sistemas",
    },
    {
    courseCode : "MA70C",
    couseName : "Cálculo Numérico",
    },
    {
    courseCode : "",
    couseName : "Simulação de Eventos Discretos",
    },
    {
    courseCode : "EL6AA",
    couseName : "Programação Matemática",
    },
    {
    courseCode : "",
    couseName : "Simulação de Sistemas Biológicos e Sociais",
    },
    {
    courseCode : "CSD45",
    couseName : "Modelagem e Avaliação de Sistemas",
    },
    {
    courseCode : "",
    couseName : "Introdução à Computação Científica",
    },
    {
    courseCode : "",
    couseName : "Métodos Formais II",
    },
    {
    courseCode : "",
    couseName : "Tópicos Especiais em Telemática III-D",
    },
    {
    courseCode : "",
    couseName : "Métodos Estocásticos",
    },
    {
    courseCode : "FI70A",
    couseName : "Mecânica Geral 1",
    },
    {
    courseCode : "FI70B -",
    couseName : "Mecânica Geral 2",
    },
    {
    courseCode : "FI70D",
    couseName : "Fenômenos de Transporte 1",
    },
    {
    courseCode : "",
    couseName : "Ótica",
    },
    {
    courseCode : "",
    couseName : "Fotônica",
    },
    {
    courseCode : "",
    couseName : "Bibliotecas Digitais",
    },
    {
    courseCode : "CSB41",
    couseName : "Banco de Dados 2",
    },
    {
    courseCode : "CSB51",
    couseName : "Recuperação Inteligente de Informações",
    },
    {
    courseCode : "",
    couseName : "Computação Baseada em Dados",
    },
    {
    courseCode : "",
    couseName : "Banco de Dados",
    },
    {
    courseCode : "",
    couseName : "Data Warehousing",
    },
    {
    courseCode : "CSH30",
    couseName : "Introdução à Interação Humano-Computador",
    },
    {
    courseCode : "CSH42",
    couseName : "Acessibilidade e Inclusão Digita",
    },
    {
    courseCode : "",
    couseName : "Avaliação em IHC",
    },
    {
    courseCode : "",
    couseName : "Computação e Sociedade",
    },
    {
    courseCode : "",
    couseName : "Trabalho Cooperativo Apoiado por Computador",
    },
    {
    courseCode : "",
    couseName : "Tópicos em Design de Interação",
    },
    {
    courseCode : "",
    couseName : "Fundamentos em Interação",
    },
    {
    courseCode : "",
    couseName : "Design de Interação",
    },
    {
    courseCode : "",
    couseName : "Engenharia Biomédica",
    },
    {
    courseCode : "EL6DA",
    couseName : "BioEngenharia",
    },
    {
    courseCode : "",
    couseName : "Engenharia Médica",
    },
    {
    courseCode : "EL6DC",
    couseName : "Engenharia Clínica",
    },
    {
    courseCode : "",
    couseName : "Instrumentação e Transdução Biomédica 1",
    },
    {
    courseCode : "",
    couseName : "Instrumentação e Transdução Biomédica 2",
    },
    {
    courseCode : "",
    couseName : "Lógica Programável e VHDL",
    },
    {
    courseCode : "",
    couseName : "Introdução à MicroEletronica",
    },
    {
    courseCode : "",
    couseName : "Laboratório de Processamento Digital de Sinais ",
    },
    {
    courseCode : "",
    couseName : "Arquiteturas Avançadas de Computadores (UFPR)",
    },
    {
    courseCode : "",
    couseName : "Arquitetura de Computadores Paralelos (UFPR)",
    },
    {
    courseCode : "",
    couseName : "Robótica Móvel",
    },
    {
    courseCode : "",
    couseName : "Engenharia de Sistemas aplicada a Sistemas Ciberfísicos",
    },
    {
    courseCode : "",
    couseName : "Sistemas de Tempo Real",
    },
    {
    courseCode : "",
    couseName : "Tópicos Avançados em Sistemas Embarcados",
    },
    {
    courseCode : "",
    couseName : "HTML/CSS",
    },
    {
    courseCode : "CSM41",
    couseName : "Desenvolvimento de Aplicações Web",
    },
    {
    courseCode : "",
    couseName : "Infraestrutura para Tecnologia de Informação",
    },
    {
    courseCode : "CSM43",
    couseName : "Programação para Dispositivos Móveis e Sem Fio",
    },
    {
    courseCode : "DI84D",
    couseName : "Web Design"
    }
    ]
  /**
   * Creates a new game based on an opponent's webId and a game document url with an acl file
   * @param {Event} e Submit event
   */
  const onSubmit = async e => {
    try {
      e.preventDefault();
      const appPath = await storageHelper.getAppStorage(webId);
      const documentPath = `${appPath}${documentUri}`;

      if (!opponent || opponent === '') {
        errorToaster(t('game.opponentMissing'), t('game.errorTitle'));
        return;
      }

      if (webId === opponent) {
        errorToaster(t('game.myself'), t('game.errorTitle'));
        return;
      }

      const result = await createGame(documentPath, opponent);

      if (result) {
        const permissions = [
          {
            agents: [opponent],
            modes: [AccessControlList.MODES.READ, AccessControlList.MODES.WRITE]
          }
        ];
        const ACLFile = new AccessControlList(webId, documentPath);
        await ACLFile.createACL(permissions);
        successToaster(t('game.createGameSuccess'), t('notifications.success'));
      }
    } catch (e) {
      errorToaster(e.message, t('game.errorTitle'));
    }
  };

  return (
    <GameFormWrapper onSubmit={onSubmit} data-testid="game-form">
      

      <h1>Lista Disciplinas Optativas</h1>
      <hr />
      <span>Selecione as disciplinas que você tem interesse</span>
      <br></br>
      <br></br>
      {universityCourses.map((course, index) => {
        return(
          <div>
            {index+1 + ". "}
            <Checkbox
              value="checkedE"
              inputProps={{
                'aria-label': 'disabled checked checkbox',
              }}
            />
            {course.courseCode ? course.courseCode : 'CSX00'} - <strong>{course.couseName}</strong>
          </div>)
      })}

      <h1>{t('game.title')}</h1>
      <hr />
      <form>
        <span>{t('game.createGamePrompt')}</span>
        <div className="input-wrap">
          <label htmlFor="documentUriInput">
            {t('game.idLabel')}
            <input
              id="documentUriInput"
              type="text"
              value={documentUri}
              onChange={e => setDocumentUri(e.target.value)}
              data-testid="uri-input"
            />
          </label>
        </div>
        <div className="input-wrap">
          <label htmlFor="opponentWebId">
            {t('game.opponentWebIDLabel')}
            <input
              id="opponentWebId"
              type="text"
              value={opponent}
              onChange={e => setOpponent(e.target.value)}
              data-testid="webId"
            />
          </label>
        </div>
        <BtnDiv>
          <button type="submit" data-testid="form-submit">
            {t('game.createGame')}
          </button>
          <button type="button" onClick={reset}>
            {t('game.resetGameForm')}
          </button>
        </BtnDiv>
      </form>
    </GameFormWrapper>
  );
};

export default GameForm;
