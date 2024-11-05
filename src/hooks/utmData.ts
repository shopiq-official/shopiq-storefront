import { useSearchParams } from "next/navigation";

export const useUTMData = () => {
  const params = useSearchParams();
  if(!localStorage?.getItem('campaign')){
    
 
    const campaignData: any = {};
  if (params.get("utm_id")) {
    campaignData.id = params.get("utm_id");
  }
  if (params.get("utm_source")) {
    campaignData.source = params.get("utm_source") ;
  }
  else {
    campaignData.source = "direct";
  }
  if (params.get("utm_medium")) {
    campaignData.medium = params.get("utm_medium");
  }
  if (params.get("utm_name")) {
    campaignData.name = params.get("utm_name");
  }
  if (params.get("utm_term")) {
    campaignData.term = params.get("utm_term");
  }
  if (params.get("referrer")) {
    campaignData.referrer = params.get("referrer");
  }
  if (params.get("utm_content")) {
    campaignData.content = params.get("utm_content");
    }
    if (Object.keys(campaignData).length > 0) {
        
        localStorage.setItem('campaign',JSON.stringify(campaignData));
    }
  }
  
}