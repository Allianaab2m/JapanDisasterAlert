import { JMAQuake, JMATsunami, EEWDetection } from './type'

export const ensureData = (data: {}) => {
  if (isJMAQuake(data)){
    return data
  } else if (isJMATsunami(data)){
    return data
  } else if (isEEWDetection(data)){
    return data
  }
}

export const isJMAQuake = (item: any): item is JMAQuake => item.code === 551 
export const isJMATsunami = (item: any): item is JMATsunami => item.code === 552
export const isEEWDetection = (item: any): item is EEWDetection => item.code === 554
