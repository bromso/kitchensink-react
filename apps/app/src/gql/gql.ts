/* eslint-disable */

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
import * as types from "./graphql"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  fragment BrandGuidelineFields on brand_guidelines {\n    id\n    nodeId\n    name\n    description\n    category\n    guideline_definition\n    is_active\n    organization_id\n    created_at\n    updated_at\n  }\n": typeof types.BrandGuidelineFieldsFragmentDoc
  "\n  \n  query GetBrandGuidelines($first: Int = 50, $after: Cursor, $category: guideline_category) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { category: { eq: $category }, is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetBrandGuidelinesDocument
  "\n  \n  query GetAllBrandGuidelines($first: Int = 100, $after: Cursor) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetAllBrandGuidelinesDocument
  "\n  \n  query GetBrandGuidelineById($id: UUID!) {\n    brand_guidelinesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n    }\n  }\n": typeof types.GetBrandGuidelineByIdDocument
  "\n  fragment UserNotificationFields on user_notifications {\n    id\n    nodeId\n    type\n    title\n    message\n    link\n    is_read\n    user_id\n    related_asset_id\n    related_comment_id\n    created_at\n  }\n": typeof types.UserNotificationFieldsFragmentDoc
  "\n  \n  query GetUserNotifications($first: Int = 20, $after: Cursor, $userId: UUID!) {\n    user_notificationsCollection(\n      first: $first\n      after: $after\n      filter: { user_id: { eq: $userId } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetUserNotificationsDocument
  "\n  \n  query GetUnreadUserNotifications($userId: UUID!) {\n    user_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.GetUnreadUserNotificationsDocument
  "\n  mutation MarkNotificationRead($id: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { id: { eq: $id } }\n      set: { is_read: true }\n    ) {\n      records {\n        id\n        is_read\n      }\n    }\n  }\n": typeof types.MarkNotificationReadDocument
  "\n  mutation MarkAllNotificationsRead($userId: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      set: { is_read: true }\n    ) {\n      affectedCount\n    }\n  }\n": typeof types.MarkAllNotificationsReadDocument
  "\n  fragment ProjectFields on projects {\n    id\n    nodeId\n    name\n    description\n    created_at\n    updated_at\n    organization_id\n  }\n": typeof types.ProjectFieldsFragmentDoc
  "\n  fragment AssetFields on assets {\n    id\n    nodeId\n    name\n    asset_type\n    workflow_status\n    file_url\n    project_id\n    created_at\n    updated_at\n  }\n": typeof types.AssetFieldsFragmentDoc
  "\n  \n  query GetProjects($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetProjectsDocument
  "\n  \n  query GetProjectById($id: UUID!) {\n    projectsCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProjectFields\n        }\n      }\n    }\n  }\n": typeof types.GetProjectByIdDocument
  "\n  \n  query GetProjectAssets($projectId: UUID!, $first: Int = 50, $after: Cursor) {\n    assetsCollection(\n      filter: { project_id: { eq: $projectId } }\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetProjectAssetsDocument
  "\n  \n  query GetAllAssets($first: Int = 20, $after: Cursor) {\n    assetsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetAllAssetsDocument
  "\n  \n  query GetProjectsWithStats($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n          assetsCollection {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetProjectsWithStatsDocument
  "\n  \n  mutation CreateProject($objects: [projectsInsertInput!]!) {\n    insertIntoprojectsCollection(objects: $objects) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n": typeof types.CreateProjectDocument
  "\n  \n  mutation UpdateProject($id: UUID!, $set: projectsUpdateInput!) {\n    updateprojectsCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n": typeof types.UpdateProjectDocument
  "\n  mutation DeleteProject($id: UUID!) {\n    deleteFromprojectsCollection(filter: { id: { eq: $id } }) {\n      records {\n        id\n      }\n    }\n  }\n": typeof types.DeleteProjectDocument
  "\n  fragment ProfileFields on profiles {\n    id\n    nodeId\n    email\n    full_name\n    avatar_url\n    organization_id\n    created_at\n    updated_at\n  }\n": typeof types.ProfileFieldsFragmentDoc
  "\n  \n  query GetProfiles($first: Int = 50, $after: Cursor) {\n    profilesCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProfileFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": typeof types.GetProfilesDocument
  "\n  \n  query GetProfileById($id: UUID!) {\n    profilesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n": typeof types.GetProfileByIdDocument
  "\n  \n  query GetCurrentProfile($userId: UUID!) {\n    profilesCollection(filter: { id: { eq: $userId } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n": typeof types.GetCurrentProfileDocument
  "\n  \n  mutation UpdateProfile($id: UUID!, $set: profilesUpdateInput!) {\n    updateprofilesCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProfileFields\n      }\n    }\n  }\n": typeof types.UpdateProfileDocument
}
const documents: Documents = {
  "\n  fragment BrandGuidelineFields on brand_guidelines {\n    id\n    nodeId\n    name\n    description\n    category\n    guideline_definition\n    is_active\n    organization_id\n    created_at\n    updated_at\n  }\n":
    types.BrandGuidelineFieldsFragmentDoc,
  "\n  \n  query GetBrandGuidelines($first: Int = 50, $after: Cursor, $category: guideline_category) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { category: { eq: $category }, is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetBrandGuidelinesDocument,
  "\n  \n  query GetAllBrandGuidelines($first: Int = 100, $after: Cursor) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetAllBrandGuidelinesDocument,
  "\n  \n  query GetBrandGuidelineById($id: UUID!) {\n    brand_guidelinesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n    }\n  }\n":
    types.GetBrandGuidelineByIdDocument,
  "\n  fragment UserNotificationFields on user_notifications {\n    id\n    nodeId\n    type\n    title\n    message\n    link\n    is_read\n    user_id\n    related_asset_id\n    related_comment_id\n    created_at\n  }\n":
    types.UserNotificationFieldsFragmentDoc,
  "\n  \n  query GetUserNotifications($first: Int = 20, $after: Cursor, $userId: UUID!) {\n    user_notificationsCollection(\n      first: $first\n      after: $after\n      filter: { user_id: { eq: $userId } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetUserNotificationsDocument,
  "\n  \n  query GetUnreadUserNotifications($userId: UUID!) {\n    user_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n":
    types.GetUnreadUserNotificationsDocument,
  "\n  mutation MarkNotificationRead($id: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { id: { eq: $id } }\n      set: { is_read: true }\n    ) {\n      records {\n        id\n        is_read\n      }\n    }\n  }\n":
    types.MarkNotificationReadDocument,
  "\n  mutation MarkAllNotificationsRead($userId: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      set: { is_read: true }\n    ) {\n      affectedCount\n    }\n  }\n":
    types.MarkAllNotificationsReadDocument,
  "\n  fragment ProjectFields on projects {\n    id\n    nodeId\n    name\n    description\n    created_at\n    updated_at\n    organization_id\n  }\n":
    types.ProjectFieldsFragmentDoc,
  "\n  fragment AssetFields on assets {\n    id\n    nodeId\n    name\n    asset_type\n    workflow_status\n    file_url\n    project_id\n    created_at\n    updated_at\n  }\n":
    types.AssetFieldsFragmentDoc,
  "\n  \n  query GetProjects($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetProjectsDocument,
  "\n  \n  query GetProjectById($id: UUID!) {\n    projectsCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProjectFields\n        }\n      }\n    }\n  }\n":
    types.GetProjectByIdDocument,
  "\n  \n  query GetProjectAssets($projectId: UUID!, $first: Int = 50, $after: Cursor) {\n    assetsCollection(\n      filter: { project_id: { eq: $projectId } }\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetProjectAssetsDocument,
  "\n  \n  query GetAllAssets($first: Int = 20, $after: Cursor) {\n    assetsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetAllAssetsDocument,
  "\n  \n  query GetProjectsWithStats($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n          assetsCollection {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetProjectsWithStatsDocument,
  "\n  \n  mutation CreateProject($objects: [projectsInsertInput!]!) {\n    insertIntoprojectsCollection(objects: $objects) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n":
    types.CreateProjectDocument,
  "\n  \n  mutation UpdateProject($id: UUID!, $set: projectsUpdateInput!) {\n    updateprojectsCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n":
    types.UpdateProjectDocument,
  "\n  mutation DeleteProject($id: UUID!) {\n    deleteFromprojectsCollection(filter: { id: { eq: $id } }) {\n      records {\n        id\n      }\n    }\n  }\n":
    types.DeleteProjectDocument,
  "\n  fragment ProfileFields on profiles {\n    id\n    nodeId\n    email\n    full_name\n    avatar_url\n    organization_id\n    created_at\n    updated_at\n  }\n":
    types.ProfileFieldsFragmentDoc,
  "\n  \n  query GetProfiles($first: Int = 50, $after: Cursor) {\n    profilesCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProfileFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n":
    types.GetProfilesDocument,
  "\n  \n  query GetProfileById($id: UUID!) {\n    profilesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n":
    types.GetProfileByIdDocument,
  "\n  \n  query GetCurrentProfile($userId: UUID!) {\n    profilesCollection(filter: { id: { eq: $userId } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n":
    types.GetCurrentProfileDocument,
  "\n  \n  mutation UpdateProfile($id: UUID!, $set: profilesUpdateInput!) {\n    updateprofilesCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProfileFields\n      }\n    }\n  }\n":
    types.UpdateProfileDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BrandGuidelineFields on brand_guidelines {\n    id\n    nodeId\n    name\n    description\n    category\n    guideline_definition\n    is_active\n    organization_id\n    created_at\n    updated_at\n  }\n"
): (typeof documents)["\n  fragment BrandGuidelineFields on brand_guidelines {\n    id\n    nodeId\n    name\n    description\n    category\n    guideline_definition\n    is_active\n    organization_id\n    created_at\n    updated_at\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetBrandGuidelines($first: Int = 50, $after: Cursor, $category: guideline_category) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { category: { eq: $category }, is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetBrandGuidelines($first: Int = 50, $after: Cursor, $category: guideline_category) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { category: { eq: $category }, is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetAllBrandGuidelines($first: Int = 100, $after: Cursor) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetAllBrandGuidelines($first: Int = 100, $after: Cursor) {\n    brand_guidelinesCollection(\n      first: $first\n      after: $after\n      filter: { is_active: { eq: true } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetBrandGuidelineById($id: UUID!) {\n    brand_guidelinesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetBrandGuidelineById($id: UUID!) {\n    brand_guidelinesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...BrandGuidelineFields\n        }\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UserNotificationFields on user_notifications {\n    id\n    nodeId\n    type\n    title\n    message\n    link\n    is_read\n    user_id\n    related_asset_id\n    related_comment_id\n    created_at\n  }\n"
): (typeof documents)["\n  fragment UserNotificationFields on user_notifications {\n    id\n    nodeId\n    type\n    title\n    message\n    link\n    is_read\n    user_id\n    related_asset_id\n    related_comment_id\n    created_at\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetUserNotifications($first: Int = 20, $after: Cursor, $userId: UUID!) {\n    user_notificationsCollection(\n      first: $first\n      after: $after\n      filter: { user_id: { eq: $userId } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetUserNotifications($first: Int = 20, $after: Cursor, $userId: UUID!) {\n    user_notificationsCollection(\n      first: $first\n      after: $after\n      filter: { user_id: { eq: $userId } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetUnreadUserNotifications($userId: UUID!) {\n    user_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetUnreadUserNotifications($userId: UUID!) {\n    user_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      orderBy: { created_at: DescNullsLast }\n    ) {\n      edges {\n        cursor\n        node {\n          ...UserNotificationFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation MarkNotificationRead($id: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { id: { eq: $id } }\n      set: { is_read: true }\n    ) {\n      records {\n        id\n        is_read\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation MarkNotificationRead($id: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { id: { eq: $id } }\n      set: { is_read: true }\n    ) {\n      records {\n        id\n        is_read\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation MarkAllNotificationsRead($userId: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      set: { is_read: true }\n    ) {\n      affectedCount\n    }\n  }\n"
): (typeof documents)["\n  mutation MarkAllNotificationsRead($userId: UUID!) {\n    updateuser_notificationsCollection(\n      filter: { user_id: { eq: $userId }, is_read: { eq: false } }\n      set: { is_read: true }\n    ) {\n      affectedCount\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProjectFields on projects {\n    id\n    nodeId\n    name\n    description\n    created_at\n    updated_at\n    organization_id\n  }\n"
): (typeof documents)["\n  fragment ProjectFields on projects {\n    id\n    nodeId\n    name\n    description\n    created_at\n    updated_at\n    organization_id\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AssetFields on assets {\n    id\n    nodeId\n    name\n    asset_type\n    workflow_status\n    file_url\n    project_id\n    created_at\n    updated_at\n  }\n"
): (typeof documents)["\n  fragment AssetFields on assets {\n    id\n    nodeId\n    name\n    asset_type\n    workflow_status\n    file_url\n    project_id\n    created_at\n    updated_at\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetProjects($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetProjects($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetProjectById($id: UUID!) {\n    projectsCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProjectFields\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetProjectById($id: UUID!) {\n    projectsCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProjectFields\n        }\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetProjectAssets($projectId: UUID!, $first: Int = 50, $after: Cursor) {\n    assetsCollection(\n      filter: { project_id: { eq: $projectId } }\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetProjectAssets($projectId: UUID!, $first: Int = 50, $after: Cursor) {\n    assetsCollection(\n      filter: { project_id: { eq: $projectId } }\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetAllAssets($first: Int = 20, $after: Cursor) {\n    assetsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetAllAssets($first: Int = 20, $after: Cursor) {\n    assetsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...AssetFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetProjectsWithStats($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n          assetsCollection {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetProjectsWithStats($first: Int = 20, $after: Cursor) {\n    projectsCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProjectFields\n          assetsCollection {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  mutation CreateProject($objects: [projectsInsertInput!]!) {\n    insertIntoprojectsCollection(objects: $objects) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  mutation CreateProject($objects: [projectsInsertInput!]!) {\n    insertIntoprojectsCollection(objects: $objects) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  mutation UpdateProject($id: UUID!, $set: projectsUpdateInput!) {\n    updateprojectsCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  mutation UpdateProject($id: UUID!, $set: projectsUpdateInput!) {\n    updateprojectsCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProjectFields\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteProject($id: UUID!) {\n    deleteFromprojectsCollection(filter: { id: { eq: $id } }) {\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteProject($id: UUID!) {\n    deleteFromprojectsCollection(filter: { id: { eq: $id } }) {\n      records {\n        id\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProfileFields on profiles {\n    id\n    nodeId\n    email\n    full_name\n    avatar_url\n    organization_id\n    created_at\n    updated_at\n  }\n"
): (typeof documents)["\n  fragment ProfileFields on profiles {\n    id\n    nodeId\n    email\n    full_name\n    avatar_url\n    organization_id\n    created_at\n    updated_at\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetProfiles($first: Int = 50, $after: Cursor) {\n    profilesCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProfileFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetProfiles($first: Int = 50, $after: Cursor) {\n    profilesCollection(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...ProfileFields\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetProfileById($id: UUID!) {\n    profilesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetProfileById($id: UUID!) {\n    profilesCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetCurrentProfile($userId: UUID!) {\n    profilesCollection(filter: { id: { eq: $userId } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetCurrentProfile($userId: UUID!) {\n    profilesCollection(filter: { id: { eq: $userId } }, first: 1) {\n      edges {\n        node {\n          ...ProfileFields\n        }\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  mutation UpdateProfile($id: UUID!, $set: profilesUpdateInput!) {\n    updateprofilesCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProfileFields\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  mutation UpdateProfile($id: UUID!, $set: profilesUpdateInput!) {\n    updateprofilesCollection(filter: { id: { eq: $id } }, set: $set) {\n      records {\n        ...ProfileFields\n      }\n    }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
