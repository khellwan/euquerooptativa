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
import { useCourseList } from '@hooks/useCourseList';
import { rdf, schema } from 'rdf-namespaces';

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

  const [courseListDocument, setCourseListDocument] = useCourseList(webId);

  const universityCourses = [
    {
    courseCode : "EL68F",
    courseName : "Controle Supervisório",
    },
    {
    courseCode : "",
    courseName : "Controle Inteligente",
    },
    {
    courseCode : "",
    courseName : "Identificação de Sistemas",
    },
    {
    courseCode : "EL6AC",
    courseName : "Controle 3",
    },
    {
    courseCode : "",
    courseName : "Controle 4",
    },
    {
    courseCode : "",
    courseName : "Controle a Eventos Discretos",
    },
    {
    courseCode : "CSV30",
    courseName : "Processamento Digital de Imagens",
    },
    {
    courseCode : "",
    courseName : "Processamento Digital de Imagens 2",
    },
    {
    courseCode : "",
    courseName : "Introdução À Visão Computacional",
    },
    {
    courseCode : "",
    courseName : "Visão Computacional",
    },
    {
    courseCode : "CSV45",
    courseName : "Reconhecimento de Padrões em Imagens",
    },
    {
    courseCode : "",
    courseName : "Computação Gráfica",
    },
    {
    courseCode : "",
    courseName : "Tópicos Avançados em Processamento Gráfico",
    },
    {
    courseCode : "",
    courseName : "Fundamentos de Processamento de Imagens Médicas",
    },
    {
    courseCode : "",
    courseName : "IA Distribuída",
    },
    {
    courseCode : "",
    courseName : "Meta-heurísticas Inspiradas em Inteligência Coletiva",
    },
    {
    courseCode : "",
    courseName : "Sistemas Fuzzy",
    },
    {
    courseCode : "CSI41",
    courseName : "Redes Neurais",
    },
    {
    courseCode : "",
    courseName : "Computação Evolucionária",
    },
    {
    courseCode : "",
    courseName : "Ontologias",
    },
    {
    courseCode : "",
    courseName : "Sistemas Autônomos Inteligentes",
    },
    {
    courseCode : "CSI53",
    courseName : "Mineração de Dados",
    },
    {
    courseCode : "",
    courseName : "Algoritmos e Complexidade",
    },
    {
    courseCode : "",
    courseName : "Complexidade Computacional",
    },
    {
    courseCode : "",
    courseName : "Introdução à Criptografia",
    },
    {
    courseCode : "",
    courseName : "Computação Quântica",
    },
    {
    courseCode : "CSA42",
    courseName : "Teoria dos Grafos",
    },
    {
    courseCode : "CSA45",
    courseName : "Geometria Computacional",
    },
    {
    courseCode : "",
    courseName : "Projeto de Infra-Estrutura de Redes",
    },
    {
    courseCode : "",
    courseName : "Redes e Sistemas de Comunicação Móveis",
    },
    {
    courseCode : "CSR41",
    courseName : "Oficina de Redes",
    },
    {
    courseCode : "CSR42",
    courseName : "Infraestrutura de LANs Hierárquicas",
    },
    {
    courseCode : "CSR43",
    courseName : "Infraestrutura de WANs",
    },
    {
    courseCode : "CSR44",
    courseName : "Segurança de Redes e Sistemas",
    },
    {
    courseCode : "",
    courseName : "Redes sem Fio",
    },
    {
    courseCode : "",
    courseName : "Simul. e Análise de Desempenho de Redes de Computadores",
    },
    {
    courseCode : "EL6BF",
    courseName : "Comunicações sem Fio",
    },
    {
    courseCode : "CSE40",
    courseName : "Engenharia de Software 2",
    },
    {
    courseCode : "",
    courseName : "Engenharia de Requisitos",
    },
    {
    courseCode : "",
    courseName : "Metodologias Ágeis p/ o Desenvolvimento de SW",
    },
    {
    courseCode : "",
    courseName : "Testes, Verificação e Validação de  Sistemas",
    },
    {
    courseCode : "",
    courseName : "Sistemas Legados",
    },
    {
    courseCode : "",
    courseName : "Modelagem de Software",
    },
    {
    courseCode : "",
    courseName : "Gerenciamento de Projeto de Software",
    },
    {
    courseCode : "CSE47",
    courseName : "Gerência de Projetos",
    },
    {
    courseCode : "",
    courseName : "Qualidade de Software",
    },
    {
    courseCode : "CSM30",
    courseName : "Desenvolvimento Integrado de Sistemas",
    },
    {
    courseCode : "MA70C",
    courseName : "Cálculo Numérico",
    },
    {
    courseCode : "",
    courseName : "Simulação de Eventos Discretos",
    },
    {
    courseCode : "EL6AA",
    courseName : "Programação Matemática",
    },
    {
    courseCode : "",
    courseName : "Simulação de Sistemas Biológicos e Sociais",
    },
    {
    courseCode : "CSD45",
    courseName : "Modelagem e Avaliação de Sistemas",
    },
    {
    courseCode : "",
    courseName : "Introdução à Computação Científica",
    },
    {
    courseCode : "",
    courseName : "Métodos Formais II",
    },
    {
    courseCode : "",
    courseName : "Tópicos Especiais em Telemática III-D",
    },
    {
    courseCode : "",
    courseName : "Métodos Estocásticos",
    },
    {
    courseCode : "FI70A",
    courseName : "Mecânica Geral 1",
    },
    {
    courseCode : "FI70B -",
    courseName : "Mecânica Geral 2",
    },
    {
    courseCode : "FI70D",
    courseName : "Fenômenos de Transporte 1",
    },
    {
    courseCode : "",
    courseName : "Ótica",
    },
    {
    courseCode : "",
    courseName : "Fotônica",
    },
    {
    courseCode : "",
    courseName : "Bibliotecas Digitais",
    },
    {
    courseCode : "CSB41",
    courseName : "Banco de Dados 2",
    },
    {
    courseCode : "CSB51",
    courseName : "Recuperação Inteligente de Informações",
    },
    {
    courseCode : "",
    courseName : "Computação Baseada em Dados",
    },
    {
    courseCode : "",
    courseName : "Banco de Dados",
    },
    {
    courseCode : "",
    courseName : "Data Warehousing",
    },
    {
    courseCode : "CSH30",
    courseName : "Introdução à Interação Humano-Computador",
    },
    {
    courseCode : "CSH42",
    courseName : "Acessibilidade e Inclusão Digita",
    },
    {
    courseCode : "",
    courseName : "Avaliação em IHC",
    },
    {
    courseCode : "",
    courseName : "Computação e Sociedade",
    },
    {
    courseCode : "",
    courseName : "Trabalho Cooperativo Apoiado por Computador",
    },
    {
    courseCode : "",
    courseName : "Tópicos em Design de Interação",
    },
    {
    courseCode : "",
    courseName : "Fundamentos em Interação",
    },
    {
    courseCode : "",
    courseName : "Design de Interação",
    },
    {
    courseCode : "",
    courseName : "Engenharia Biomédica",
    },
    {
    courseCode : "EL6DA",
    courseName : "BioEngenharia",
    },
    {
    courseCode : "",
    courseName : "Engenharia Médica",
    },
    {
    courseCode : "EL6DC",
    courseName : "Engenharia Clínica",
    },
    {
    courseCode : "",
    courseName : "Instrumentação e Transdução Biomédica 1",
    },
    {
    courseCode : "",
    courseName : "Instrumentação e Transdução Biomédica 2",
    },
    {
    courseCode : "",
    courseName : "Lógica Programável e VHDL",
    },
    {
    courseCode : "",
    courseName : "Introdução à MicroEletronica",
    },
    {
    courseCode : "",
    courseName : "Laboratório de Processamento Digital de Sinais ",
    },
    {
    courseCode : "",
    courseName : "Arquiteturas Avançadas de Computadores (UFPR)",
    },
    {
    courseCode : "",
    courseName : "Arquitetura de Computadores Paralelos (UFPR)",
    },
    {
    courseCode : "",
    courseName : "Robótica Móvel",
    },
    {
    courseCode : "",
    courseName : "Engenharia de Sistemas aplicada a Sistemas Ciberfísicos",
    },
    {
    courseCode : "",
    courseName : "Sistemas de Tempo Real",
    },
    {
    courseCode : "",
    courseName : "Tópicos Avançados em Sistemas Embarcados",
    },
    {
    courseCode : "",
    courseName : "HTML/CSS",
    },
    {
    courseCode : "CSM41",
    courseName : "Desenvolvimento de Aplicações Web",
    },
    {
    courseCode : "",
    courseName : "Infraestrutura para Tecnologia de Informação",
    },
    {
    courseCode : "CSM43",
    courseName : "Programação para Dispositivos Móveis e Sem Fio",
    },
    {
    courseCode : "DI84D",
    courseName : "Web Design"
    }
    ]
  
  const getSelectedCourseIndexes = () => {
    return [];
  }

  const [courseIndexes, setCourseIndexes] = useState(getSelectedCourseIndexes());
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

  const saveCourses = async () => {
    // Remove all the courses and save the ones currently selected
    const courseList = courseListDocument.getSubjectsOfType(schema.Course);
    for (let course of courseList) {
      courseListDocument.removeSubject(course.asRef());
    }
    
    const newCourseList = [];
    courseIndexes.forEach((index) => {
      // Create each subject and fill in it's data
      const newCourse = courseListDocument.addSubject();
      newCourse.addRef(rdf.type, schema.Course);
      newCourse.addLiteral(schema.courseCode, universityCourses[index].courseCode);
      newCourse.addLiteral(schema.description, universityCourses[index].courseName);
      newCourseList.push(newCourse);
    })
    const newDocument = await courseListDocument.save(courseList.concat(newCourseList));
    setCourseListDocument(newDocument);
  }

  const handleCheckboxChange = async index => {
    const currentIndex = courseIndexes.indexOf(index);
    const newIndexes = [...courseIndexes];

    if (currentIndex === -1) {
      newIndexes.push(index);
    } else {
      newIndexes.splice(currentIndex, 1);
    }
    console.log(newIndexes);
    setCourseIndexes(newIndexes);
  }

  return (
    <GameFormWrapper data-testid="game-form">
      <h1>Lista Disciplinas Optativas</h1>
      <hr />
      <span>Selecione as disciplinas que você tem interesse</span>
      <br></br>
      <br></br>
      <button onClick={saveCourses}><span>Salvar disciplinas</span></button>
      {universityCourses.map((course, index) => {
        return(
          <div>
            {index+1 + ". "}
            <Checkbox
              value="checkedE"
              onClick={() => handleCheckboxChange(index)}
              inputProps={{
                'aria-label': 'disabled checked checkbox',
              }}
            />
            {course.courseCode ? course.courseCode : 'CSX00'} - <strong>{course.courseName}</strong>
          </div>)
      })}
    </GameFormWrapper>
  );
};

export default GameForm;
