import api from './api'

export const getCampaigns = async () => {
  const { data } = await api.get('/campaigns')
  return data
}

export const createCampaign = async (campaignData) => {
  const { data } = await api.post('/campaigns', campaignData)
  return data
}

export const getCampaignStats = async (campaignId) => {
  const { data } = await api.get(`/campaigns/${campaignId}/stats`)
  return data
}