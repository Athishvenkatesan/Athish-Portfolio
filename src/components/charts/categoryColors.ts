/**
 * Fixed categorical color assignment for project categories — used by
 * ProjectCategoryDonut and ProjectComplexityBubble so the same category
 * always reads as the same hue across both charts. Assigned in a fixed
 * order (never generated/cycled), per the dataviz skill's categorical rule.
 */
import type { ProjectCategory } from '@/data/projects'

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  'React / Front-End': '#7c5cff',
  'Power Platform': '#19c2a8',
  'Copilot Agent': '#3b82f6',
  'Machine Learning': '#ff7ab6',
  Web: '#d97706',
}
