/**
 * Data hooks for client-side data fetching
 * These hooks provide a unified API that works with both mock data and real GraphQL
 */

export { useAllAssetsForCategory, useAsset, useAssetsByCategory } from "./use-assets"
export {
  type BrandGuideline,
  Guideline_Category,
  useBrandGuideline,
  useBrandGuidelines,
  useBrandGuidelinesByCategory,
} from "./use-brand-guidelines"
export {
  useArtefact,
  useArtefacts,
  useArtefactsByStatus,
  useCampaign,
  useCampaignArtefacts,
  useCampaigns,
  useCreateCampaign,
} from "./use-campaigns"
export {
  type UserNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  useUnreadNotifications,
} from "./use-notifications"
export { useUser, useUsers, useUsersByStatus } from "./use-users"
