import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import {ApplicantQuery} from "../graphql/applicant/applicant_query";
import {Application} from "express";
import {ApplicantMutation} from "../graphql/applicant/applicant_mutation";
import {ApplicantRequestQuery} from "../graphql/applicant/applicant_request_query";
import {ApplicantQuestionnaireMutation} from "../graphql/applicant/applicant_questionnaire_mutation";
import {ApplicantRequestMutation} from "../graphql/applicant/applicant_request_mutation";
import {ApplicantProcedureRequestInput} from "../view/applicant_procedure_request_input";
import { ApplicantStage } from "../view/applicant_stage";
import { ApplicantStageResolver} from "../resolvers/applicant/applicant_stage_resolver";
import { ApplicantRequest } from "../view/applicant_request";
import { ApplicantRequestList } from "../view/applicant_request_list";
import {ApplicantQuestion} from "../view/applicant_question";
import { StageEnumEntity } from "../model/stage_enum_entity";
import { ApplicantRequestResolver } from "../resolvers/applicant/applicant_request_resolver";
import { ApplicantProcedure } from "../view/applicant_procedure";
import { ApplicantProcedureResolver } from "../resolvers/applicant/applicant_procedure_resolver";
import { ApplicantRequestAnswerResolver } from "../resolvers/applicant/applicant_request_answer_resolver";
import { ApplicantRequestAnswer } from "../view/applicant_request_answer";
import {ApplicantQuestionResolver} from "../resolvers/applicant/applicant_question_resolver";


const pathSchema: string = path.join(__dirname, "../graphql/applicant/applicant.graphql");
const schemaContent: string = readFileSync(pathSchema, "utf8");
const typeDefs = gql`${ schemaContent }`;


const resolvers = {
  Query: {
      request: () => Container.get(ApplicantQuery).request
  },


  Mutation: {
      questionnaire: () => Container.get(ApplicantMutation).questionnaire,
      request: () => Container.get(ApplicantMutation).request
  },


  RequestQuery: {
      get: (parent: ApplicantRequestQuery, args: {id: string}) => parent.get(args.id),
      requests: (parent: ApplicantRequestQuery, args: {name: string, size: number}) => parent.requests(args.name, args. size),
      drafts: (parent: ApplicantRequestQuery, args: {name: string, size: number}) => parent.drafts(args.name, args. size),
      select: (parent: ApplicantRequestQuery, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
  },


  QuestionnaireMutation: {
    start: (parent: ApplicantQuestionnaireMutation) => parent.start(),
    next: (parent: ApplicantQuestionnaireMutation, args: {id: string, questionId?: string, answerId?: number, answer?: string}) => parent.next(args.id, args.questionId, args.answerId, args.answer),
    save: (parent: ApplicantQuestionnaireMutation, args: {id: string, name: string}) => parent. save(args. id, args.name),
    build: (parent: ApplicantQuestionnaireMutation, args: {id: string}) => parent.build(args.id)
  },

  Question: {
    answers: (parent: ApplicantQuestion) => Container.get(ApplicantQuestionResolver).answers(parent)
  },

  RequestMutation: {
    delete: (parent: ApplicantRequestMutation, args: {id: string}) => parent.delete(args.id),
    send: (parent: ApplicantRequestMutation, args: { request: ApplicantProcedureRequestInput}) => parent.send(args.request)
  },


  Request: {
    answers: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).answers(parent),
    projectPreparation: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.PROJECT_PREPARATION),
    designing: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.DESIGNING),
    buildingPreparation: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.BUILDING_PREPARATION),
    constructionAndAssembly: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.CONSTRUCTION_AND_ASSEMBLY),
    constructionAndAssemblyFinish: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.CONSTRUCTION_AND_ASSEMBLY_FINISH),
    resourceConnection: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.RESOURCE_CONNECTION),
    commissioning: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.COMMISSIONING),
    finish: (parent: ApplicantRequest) => Container.get(ApplicantRequestResolver).stage(parent, StageEnumEntity.FINISH)
  },


  RequestAnswer: {
    answer: (parent: ApplicantRequestAnswer) => Container.get(ApplicantRequestAnswerResolver).answer(parent)
  },


  Stage: {
    duration: (parent: ApplicantStage) => Container.get(ApplicantStageResolver).duration(parent),
    procedures: (parent: ApplicantStage) => Container.get(ApplicantStageResolver).procedures(parent)
  },


  Procedure: {
    duration: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).duration(parent),
    dependsOn: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).dependsOn(parent),
    executiveAuthority: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).executiveAuthority(parent),
    files: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).files(parent),
    documents: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).documents(parent),
    state: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).state(parent),
    request: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).request(parent),
    response: (parent: ApplicantProcedure) => Container.get(ApplicantProcedureResolver).response(parent)
  },


  RequestList: {
    count: (parent: ApplicantRequestList) => parent.count(),
    items: (parent: ApplicantRequestList) => parent.items()
  }
};


const apolloServer: ApolloServer = new ApolloServer({ typeDefs, resolvers });

export function apolloApplicant(app: Application) {
  apolloServer.applyMiddleware({
    app,
    path: "/applicant"
  });
}
