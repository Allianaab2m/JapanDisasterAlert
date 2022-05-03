export interface BasicData {
  id: string
  code: number
  time: string
}

export interface EarthQuakeType {
  time: string
  hypocenter?: {
    name?: string
    latitude?: number
    longitude? : number
    depth?: number
    magnitude?: number
  }
  maxScale?: -1 | 10 | 20 | 30 | 40 | 45 | 50 | 55 | 60 | 70
  domesticTsunami?: 'None' | 'Unknown' | 'Checking' | 'NonEffective' | 'Watch' | 'Warning'
  foreignTsunami?: 'None' | 'Unknown' | 'Checking' | 'NonEffectiveNearby' | 'WarningNearby' | 'WarningPacific' | 'WarningPacificWide' | 'WarningIndian' | 'WarningIndianWide' | 'Potential'
}

export interface PointType {
  pref: string
  addr: string
  isArea: boolean
  scale: 10 | 20 | 30 | 40 | 45 | 46 | 50 | 55 | 60 | 70
}

interface BaseIssueType {
  source?: string
  time: string
}

export interface JMAQuakeIssueType extends BaseIssueType {
  type: 'ScalePrompt' | 'Destination' | 'ScaleAndDestination' | 'DetailScale' | 'Foreign' | 'Other'
  correct?: 'None' | 'Unknown' | 'ScaleOnly' | 'DestinationOnly' | 'ScaleAndDestination'
}

export interface JMATsunamiIssueType extends BaseIssueType {
  type: 'Focus'
}

export interface JMAQuake extends BasicData {
  code: 551
  issue: JMAQuakeIssueType
  earthquake: EarthQuakeType
  points?: PointType[]
}

export interface JMATsunami extends BasicData {
  code: 552
  issue: JMATsunamiIssueType
  cancelled: boolean
  areas: [{
    grade?: 'MajorWarning' | 'Warning' | 'Watch' | 'Unknown'
    immediate?: boolean
    name: string
  }]
}

export interface EEWDetection extends BasicData {
  code: 554
  type: 'Full' | 'Chime'
}
