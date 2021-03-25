import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import {Application} from "express";
import {BackofficeQuery} from "../graphql/backoffice/backoffice_query";
import {BackofficeMutation} from "../graphql/backoffice/backoffice_mutation";
import {BackofficeUserQuery} from "../graphql/backoffice/backoffice_user_query";
import {BackofficeUserMutation} from "../graphql/backoffice/backoffice_user_mutation";
import {BackofficeUserInput} from "../view/backoffice/backoffice_user";
import {BackofficeExecutiveAuthorityQuery} from "../graphql/backoffice/backoffice_executive_authority_query";
import {BackofficeExecutiveAuthorityMutation} from "../graphql/backoffice/backoffice_executive_authority_mutation";
import {BackofficeExecutiveAuthority} from "../view/backoffice/backoffice_executive_authority";
import {BackofficeQuestionQuery} from "../graphql/backoffice/backoffice_question_query";
import {BackofficeQuestionnaireQuery} from "../graphql/backoffice/backoffice_questionnaire_query";
import {BackofficeQuestionnaireMutation} from "../graphql/backoffice/backoffice_questionnaire_mutation";
import {BackofficeQuestionMutation} from "../graphql/backoffice/backoffice_question_mutation";
import {BackofficeAnswer, BackofficeQuestion, BackofficeQuestionInput} from "../view/backoffice/backoffice_question";
import {BackofficeProcedureQuery} from "../graphql/backoffice/backoffice_procedure_query";
import {BackofficeProcedureMutation} from "../graphql/backoffice/backoffice_procedure_mutation";
import {BackofficeProcedure, BackofficeProcedureInput, BackofficeProcedureRule, BackofficeStage} from "../view/backoffice/backoffice_procedure";
import {
    BackofficeInboxMessage,
    BackofficeRequestProcedure,
    BackofficeRequestProcedureAnswer,
    BackofficeRequestProcedureRequest,
    BackofficeRequestProcedureResponse,
    BackofficeRequestProcedureStatus
} from "../view/backoffice/backoffice_request_procedure";
import {BackofficeReportQuery} from "../graphql/backoffice/backoffice_report_query";
import {BackofficeQuestionResolver} from "../resolvers/backoffice/backoffice_question_resolver";
import {BackofficeAnswerResolver} from "../resolvers/backoffice/backoffice_answer_resolver";
import {BackofficeProcedureResolver} from "../resolvers/backoffice/backoffice_procedure_resolver";
import {BackofficeProcedureRuleResolver} from "../resolvers/backoffice/backoffice_procedure_rule_resolver";
import {BackofficeRequestProcedureQuery} from "../graphql/backoffice/backoffice_request_procedure_query";
import {BackofficeRequestProcedureMutation} from "../graphql/backoffice/backoffice_request_procedure_mutation";
import {BackofficeRequestProcedureResolver} from "../resolvers/backoffice/backoffice_request_procedure_resolver";
import {BackofficeRequestProcedureAnswerResolver} from "../resolvers/backoffice/backoffice_request_procedure_answer_resolver";
import {BackofficeRequestProcedureRequestResolver} from "../resolvers/backoffice/backoffice_request_procedure_request_resolver";
import {BackofficeRequestProcedureResponseResolver} from "../resolvers/backoffice/backoffice_request_procedure_response_resolver";
import {BackofficeRequestProcedureIncomingMutation} from "../graphql/backoffice/backoffice_request_procedure_incoming_mutation";
import {BackofficeRequestProcedureModerationMutation} from "../graphql/backoffice/backoffice_request_procedure_moderation_mutation";
import {BackofficeInboxMessageResolver} from "../resolvers/backoffice/backoffice_inbox_message_resolver";


const pathSchema: string = path.join(__dirname, "../graphql/backoffice/backoffice.graphql");
const schemaContent: string = readFileSync(pathSchema, "utf8");
const typeDefs = gql`${ schemaContent }`;


const resolvers = {
    Query: {
        user: () => Container.get(BackofficeQuery).user,
        executiveAuthority: () => Container.get(BackofficeQuery).executiveAuthority,
        questionnaire: () => Container.get(BackofficeQuery).questionnaire,
        requestProcedure: () => Container.get(BackofficeQuery).requestProcedure,
        report: () => Container.get(BackofficeQuery).report
    },

    Mutation: {
        user: () => Container.get(BackofficeMutation).user,
        executiveAuthority: () => Container.get(BackofficeMutation).executiveAuthority,
        questionnaire: () => Container.get(BackofficeMutation).questionnaire,
        requestProcedure: () => Container.get(BackofficeMutation).requestProcedure,
    },

    UserQuery: {
        get: (parent: BackofficeUserQuery, args: { id: string }) => parent.get(args.id),
        list: (parent: BackofficeUserQuery, args: { name?: string, size?: number }) => parent.list(args.name, args.size),
        select: (path: BackofficeUserQuery, args: { cursor: string, offset: number }) => path.select(args.cursor, args.offset)
    },

    UserMutation: {
        create: (parent: BackofficeUserMutation, args: { user: BackofficeUserInput }) => parent.create(args.user),
        update: (parent: BackofficeUserMutation, args: { user: BackofficeUserInput }) => parent.update(args.user),
        delete: (parent: BackofficeUserMutation, args: { id: string }) => parent.delete(args.id)
    },

    ExecutiveAuthorityQuery: {
        get: (parent: BackofficeExecutiveAuthorityQuery, args: {id: string}) => parent.get(args.id),
        list: (parent: BackofficeExecutiveAuthorityQuery, args: {name?: string, size?: number}) => parent.list(args.name, args.size),
        select: (parent: BackofficeExecutiveAuthorityQuery, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
    },

    ExecutiveAuthorityMutation: {
        create: (parent: BackofficeExecutiveAuthorityMutation, args: {executiveAuthority: BackofficeExecutiveAuthority}) => parent.create(args.executiveAuthority),
        update: (parent: BackofficeExecutiveAuthorityMutation, args: {executiveAuthority: BackofficeExecutiveAuthority}) => parent.update(args.executiveAuthority),
        delete: (parent: BackofficeExecutiveAuthorityMutation, args: {id: string}) => parent.delete(args.id)
    },

    QuestionnaireQuery: {
        question: (parent: BackofficeQuestionnaireQuery) => parent.question,
        procedure: (parent: BackofficeQuestionnaireQuery) => parent.procedure
    },

    QuestionnaireMutation: {
        question: (parent: BackofficeQuestionnaireMutation) => parent.question,
        procedure: (parent: BackofficeQuestionnaireMutation) => parent.procedure,
        publish: (parent: BackofficeQuestionnaireMutation) => parent.publish()
    },

    QuestionQuery: {
        get: (parent: BackofficeQuestionQuery, args: {id: string}) => parent.get(args.id),
        list: (parent: BackofficeQuestionQuery, args: {name?: string, beforeId?: string, offset?: number, size?: number}) => parent.list(args.name, args.beforeId, args.offset, args.size),
        select: (parent: BackofficeQuestionQuery, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
    },

    QuestionMutation: {
        create: (parent: BackofficeQuestionMutation, args: {question: BackofficeQuestionInput}) => parent.create(args.question),
        update: (parent: BackofficeQuestionMutation, args: {question: BackofficeQuestionInput}) => parent.update(args.question),
        moveUp: (parent: BackofficeQuestionMutation, args: {id: string}) => parent.moveUp(args.id),
        moveDown: (parent: BackofficeQuestionMutation, args: {id: string}) => parent.moveDown(args.id),
        delete: (parent: BackofficeQuestionMutation, args: {id: string}) => parent.delete(args.id)
    },

    ProcedureQuery: {
        get: (parent: BackofficeProcedureQuery, args: {id: string}) => parent.get(args.id),
        list: (parent: BackofficeProcedureQuery, args: {q?: string, stage?: BackofficeStage, offset?: number, size?: number}) => parent.list(args.q, args.stage, args.offset, args.size),
        select: (parent: BackofficeProcedureQuery, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
    },

    ProcedureMutation: {
        create: (parent: BackofficeProcedureMutation, args: {procedure: BackofficeProcedureInput}) => parent.create(args.procedure),
        update: (parent: BackofficeProcedureMutation, args: {procedure: BackofficeProcedureInput}) => parent.update(args.procedure),
        delete: (parent: BackofficeProcedureMutation, args: {id: string}) => parent.delete(args.id)
    },

    RequestProcedureQuery: {
        get: (parent: BackofficeRequestProcedureQuery, args: {id: string}) => parent.get(args.id),
        getInbox: (parent: BackofficeRequestProcedureQuery, args: {id: string}) => parent.getInbox(args.id),
        list: (parent: BackofficeRequestProcedureQuery, args: {executiveAuthorityId?: string, inProgress?: boolean, size?: number, offset?: number}) => parent.list(args.executiveAuthorityId, args.inProgress, args.size, args.offset),
        select: (parent: BackofficeRequestProcedureQuery, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
    },

    RequestProcedureMutation: {
        incoming: (parent: BackofficeRequestProcedureMutation) => parent.incomingMutation,
        moderation: (parent: BackofficeRequestProcedureMutation) => parent.moderationMutation
    },

    RequestProcedureIncomingMutation: {
        assignInboxAndMark: (parent: BackofficeRequestProcedureIncomingMutation, args: {id: string, inboxId: string, status: BackofficeRequestProcedureStatus}) => parent.assignInboxAndMark(args.id, args.inboxId, args.status),
        mark: (parent: BackofficeRequestProcedureIncomingMutation, args: {id: string, status: BackofficeRequestProcedureStatus}) => parent.mark(args.id, args.status)
    },

    RequestProcedureModerationMutation: {
        return: (parent: BackofficeRequestProcedureModerationMutation, args: {id: string, notes?: string}) => parent.return(args.id, args.notes),
        approve: (parent: BackofficeRequestProcedureModerationMutation, args: {id: string}) => parent.approve(args.id)
    },

    ReportQuery: {
        requestsByStatus: (parent: BackofficeReportQuery, args: {from?: string, to?: string}) => parent.requestsByStatus(args.from, args.to),
        requestsByWaitTimeout: (parent: BackofficeReportQuery, args: {from?: string, to?: string}) => parent.requestsByWaitTimeout(args.from, args.to)
    },

    Question: {
        answers: (parent: BackofficeQuestion) => Container.get(BackofficeQuestionResolver).answers(parent),
        dependencies: (parent: BackofficeQuestion) => Container.get(BackofficeQuestionResolver).dependencies(parent)
    },

    Answer: {
        question: (parent: BackofficeAnswer) => Container.get(BackofficeAnswerResolver).question(parent)
    },

    Procedure: {
        executiveAuthority: (parent: BackofficeProcedure) => Container.get(BackofficeProcedureResolver).executiveAuthority(parent),
        documents: (parent: BackofficeProcedure) => Container.get(BackofficeProcedureResolver).documents(parent),
        files: (parent: BackofficeProcedure) => Container.get(BackofficeProcedureResolver).files(parent),
        rules: (parent: BackofficeProcedure) => Container.get(BackofficeProcedureResolver).rules(parent),
        dependsOn: (parent: BackofficeProcedure) => Container.get(BackofficeProcedureResolver).dependsOn(parent)
    },

    ProcedureBase: {
        executiveAuthority: (parent: BackofficeProcedure) => Container.get(BackofficeProcedureResolver).executiveAuthority(parent),
    },

    ProcedureRule: {
        answers: (parent: BackofficeProcedureRule) => Container.get(BackofficeProcedureRuleResolver).answers(parent)
    },

    RequestProcedure: {
        answers: (parent: BackofficeRequestProcedure) => Container.get(BackofficeRequestProcedureResolver).answers(parent),
        executiveAuthority: (parent: BackofficeRequestProcedure) => Container.get(BackofficeRequestProcedureResolver).executiveAuthority(parent),
        documents: (parent: BackofficeRequestProcedure) => Container.get(BackofficeRequestProcedureResolver).documents(parent),
        request: (parent: BackofficeRequestProcedure) => Container.get(BackofficeRequestProcedureResolver).request(parent),
        response: (parent: BackofficeRequestProcedure) => Container.get(BackofficeRequestProcedureResolver).response(parent)
    },

    RequestProcedureAnswer: {
        question: (parent: BackofficeRequestProcedureAnswer) => Container.get(BackofficeRequestProcedureAnswerResolver).question(parent),
        answer: (parent: BackofficeRequestProcedureAnswer) => Container.get(BackofficeRequestProcedureAnswerResolver).answer(parent)
    },

    RequestProcedureRequest: {
        timeLeft: (parent: BackofficeRequestProcedureRequest) => Container.get(BackofficeRequestProcedureRequestResolver).timeLeft(parent),
        files: (parent: BackofficeRequestProcedureRequest) => Container.get(BackofficeRequestProcedureRequestResolver).files(parent)
    },

    RequestProcedureResponse: {
        files: (parent: BackofficeRequestProcedureResponse) => Container.get(BackofficeRequestProcedureResponseResolver).files(parent)
    },

    InboxMessage: {
        executiveAuthority: (parent: BackofficeInboxMessage) => Container.get(BackofficeInboxMessageResolver).executiveAuthority(parent),
        attachments: (parent: BackofficeInboxMessage) => Container.get(BackofficeInboxMessageResolver).attachments(parent)
    }

};


const apolloServer: ApolloServer = new ApolloServer({typeDefs, resolvers});

export function init(app: Application) {
    apolloServer.applyMiddleware({
        app,
        path: "/backoffice"
    });
}
