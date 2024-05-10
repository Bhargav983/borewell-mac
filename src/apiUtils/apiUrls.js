//  const BASE_URL_FOR_BAR_CHART = "https://eleni.in/public/api/";
const BASE_URL = 'https://nimblevision.io/public/api/';
// const BASE_URL = 'https://eleni.in/public/api/';
const VERIFY_USER_BY_PHONE_MAIL_ENDPOINT = 'postuserphone';
const GET_DEVICES_ENDPOINT = 'getUserDeviceIds'; 
const GET_DEVICE_TANKS_ENDPOINT = 'getDeviceTank'; 
const GET_WATER_LEVEL_ENDPOINT = 'getDeviceTankState1'; 
const GET_PIE_CHART_DATA_ENDPOINT = 'getDeviceTankState2'; 
const GET_BAR_CHART_DATA_ENDPOINT = 'getDeviceTankState3'; 

export const postUserByPhoneEmailUrl = (phone, email) => 
  `${BASE_URL}${VERIFY_USER_BY_PHONE_MAIL_ENDPOINT}?key=chinnu&token=257bbec888a81696529ee979804cca59&user_phone=${phone}&user_email=${encodeURIComponent(email)}`;

export const getDevicesUrl = (phone, email) => 
  `${BASE_URL}${GET_DEVICES_ENDPOINT}?key=chinnu&token=257bbec888a81696529ee979804cca59&user_phone=${phone}&user_email=${email}`;

export const getDeviceTanksUrl = (profileType, deviceId) => 
  `${BASE_URL}${GET_DEVICE_TANKS_ENDPOINT}?profile_type=${profileType}&device_id=${deviceId}&key=chinnu&token=257bbec888a81696529ee979804cca59`;

export const getTankWaterLevelUrl = (profileType, deviceId, tankId) => 
`${BASE_URL}${GET_WATER_LEVEL_ENDPOINT}?profile_type=${profileType}&device_id=${deviceId}&tank_id=${tankId}&key=chinnu&token=257bbec888a81696529ee979804cca59`;

export const getPieChartDataUrl = (profileId, deviceId,tankId) => 
  `${BASE_URL}${GET_PIE_CHART_DATA_ENDPOINT}?profile_type=${profileId}&device_id=${deviceId}&tank_id=${tankId}&key=chinnu&token=257bbec888a81696529ee979804cca59`;
  
export const getBarChartDataUrl = (profileId, deviceId,tankId) => 
`${BASE_URL}${GET_BAR_CHART_DATA_ENDPOINT}?profile_type=${profileId}&device_id=${deviceId}&tank_id=${tankId}&key=chinnu&token=257bbec888a81696529ee979804cca59`;

