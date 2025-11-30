import { Language } from './types';

export const translations = {
  en: {
    appTitle: 'Recovery',
    appTitleSuffix: 'Needs',
    subtitle: 'POST-DISASTER SUPPLY ASSESSMENT',
    liveMap: 'Live Map',
    analytics: 'Analytics',
    emergencyNav: 'Emergency',
    heroTag: 'Needs Assessment Active',
    heroTitle: 'Post-Disaster Needs Assessment',
    heroDesc: 'Collect critical data on damages to homes, businesses, and vehicles to determine the resources required for recovery and restoration steps.',
    
    // Form
    submitReport: 'Submit Assessment',
    location: 'Location',
    selectOnMap: 'Select on Map',
    pickLocation: 'Pick Location First',
    home: 'Home',
    business: 'Business',
    vehicle: 'Vehicle',
    
    // Home Form
    occupantsAge: 'Occupants by Age Group',
    years: 'Yrs',
    damageAssessment: 'Damage Assessment',
    
    // Business Form
    businessScale: 'Business Scale',
    severityAssessment: 'Severity Assessment',
    small: 'SMALL',
    medium: 'MEDIUM',
    large: 'LARGE',
    
    // Vehicle Form
    vehicleType: 'Vehicle Type',
    quantity: 'Quantity',
    
    // Common Form
    evidencePhoto: 'Evidence Photo (Optional)',
    clickToUpload: 'Click to upload image',
    describeDetails: 'Describe the restoration needs here...',
    
    // Dashboard
    impactAnalytics: 'Needs Analytics',
    analyticsDesc: 'Aggregated data of estimated recovery requirements for floods and landslides.',
    homes: 'Homes',
    avgDamage: 'Avg Damage',
    businesses: 'Business',
    commercial: 'Commercial',
    vehicles: 'Vehicles',
    criticalLoss: 'Critical Loss',
    affectedPeople: 'Affected People',
    displaced: 'Displaced',
    ageDemographics: 'Age Demographics',
    ageDesc: 'Distribution of population requiring support.',
    vehicleLosses: 'Vehicle Losses',
    vehicleDesc: 'Breakdown of transport resources lost.',
    businessImpactScale: 'Business Impact Scale',
    businessDesc: 'Economic restoration scale required.',
    
    // Map
    residents: 'Residents',
    damage: 'Damage',
    size: 'Size',
    count: 'Count',
    type: 'Type',

    // Emergency Page
    emergencyNumbers: 'General Emergency Numbers',
    sriLanka: 'LK Sri Lanka',
    emergency: 'Emergency',
    police: 'Police',
    fireBrigade: 'Fire Brigade',
    ambulance: 'Ambulance',
    tapToCall: 'Tap to call',
    importantNotice: 'Important: For immediate life-threatening emergencies, call 117 first.',
    
    // Footer
    footerInfo: 'This platform utilizes crowd-sourced information collected through field visits.',
    developer: 'Developed by Subodha Kalhara'
  },
  si: {
    appTitle: 'ප්‍රතිසාධන',
    appTitleSuffix: 'අවශ්‍යතා',
    subtitle: 'පසු-ආපදා අවශ්‍යතා තක්සේරුව',
    liveMap: 'සජීවී සිතියම',
    analytics: 'විශ්ලේෂණ',
    emergencyNav: 'හදිසි ඇමතුම්',
    heroTag: 'අවශ්‍යතා තක්සේරුව සක්‍රීයයි',
    heroTitle: 'පසු-ආපදා අවශ්‍යතා තක්සේරුව',
    heroDesc: 'ප්‍රතිසාධනය සහ යථා තත්ත්වයට පත් කිරීම සඳහා අවශ්‍ය සම්පත් තීරණය කිරීමට නිවාස, ව්‍යාපාර සහ වාහන වලට සිදුවූ හානි පිළිබඳ දත්ත රැස් කරන්න.',
    
    // Form
    submitReport: 'තක්සේරුව යොමු කරන්න',
    location: 'ස්ථානය',
    selectOnMap: 'සිතියමෙන් තෝරන්න',
    pickLocation: 'පළමුව ස්ථානය තෝරන්න',
    home: 'නිවාස',
    business: 'ව්‍යාපාර',
    vehicle: 'වාහන',
    
    // Home Form
    occupantsAge: 'වයස් කාණ්ඩ අනුව පදිංචිකරුවන්',
    years: 'වයස',
    damageAssessment: 'හානි තක්සේරුව',
    
    // Business Form
    businessScale: 'ව්‍යාපාරික පරිමාණය',
    severityAssessment: 'බරපතලකම තක්සේරුව',
    small: 'කුඩා',
    medium: 'මධ්‍යම',
    large: 'විශාල',
    
    // Vehicle Form
    vehicleType: 'වාහන වර්ගය',
    quantity: 'ප්‍රමාණය',
    
    // Common Form
    evidencePhoto: 'සාක්ෂි ඡායාරූප (විකල්ප)',
    clickToUpload: 'ඡායාරූපයක් එක් කිරීමට ඔබන්න',
    describeDetails: 'ප්‍රතිසාධන අවශ්‍යතා විස්තර මෙහි සටහන් කරන්න...',
    
    // Dashboard
    impactAnalytics: 'අවශ්‍යතා විශ්ලේෂණය',
    analyticsDesc: 'ගංවතුර සහ නායයෑම් සඳහා ඇස්තමේන්තුගත ප්‍රතිසාධන අවශ්‍යතා.',
    homes: 'නිවාස',
    avgDamage: 'සාමාන්‍ය හානිය',
    businesses: 'ව්‍යාපාර',
    commercial: 'වාණිජ',
    vehicles: 'වාහන',
    criticalLoss: 'බරපතල අලාභ',
    affectedPeople: 'විපතට පත් වූවන්',
    displaced: 'අවතැන් වූ',
    ageDemographics: 'වයස් ජනගහන විස්තරය',
    ageDesc: 'සහය අවශ්‍ය ජනගහන ව්‍යාප්තිය.',
    vehicleLosses: 'වාහන අලාභ',
    vehicleDesc: 'අහිමි වූ ප්‍රවාහන සම්පත්.',
    businessImpactScale: 'ව්‍යාපාරික බලපෑම් පරිමාණය',
    businessDesc: 'ආර්ථික ප්‍රතිසාධන පරිමාණය.',
    
    // Map
    residents: 'පදිංචිකරුවන්',
    damage: 'හානිය',
    size: 'පරිමාණය',
    count: 'ගණන',
    type: 'වර්ගය',

    // Emergency Page
    emergencyNumbers: 'සාමාන්‍ය හදිසි ඇමතුම් අංක',
    sriLanka: 'LK ශ්‍රී ලංකාව',
    emergency: 'හදිසි අවස්ථා',
    police: 'පොලිසිය',
    fireBrigade: 'ගිනි නිවන ඒකකය',
    ambulance: 'ගිලන් රථ සේවය',
    tapToCall: 'ඇමතීමට ඔබන්න',
    importantNotice: 'වැදගත්: ජීවිතයට තර්ජනයක් වන හදිසි අවස්ථාවකදී පළමුව 117 අමතන්න.',
    
    // Footer
    footerInfo: 'මෙම වේදිකාව ක්ෂේත්‍ර චාරිකා මගින් රැස් කරන ලද මහජන දායකත්ව තොරතුරු භාවිතා කරයි.',
    developer: 'නිර්මාණය: සුබෝධ කල්හාර'
  },
  ta: {
    appTitle: 'மீட்பு',
    appTitleSuffix: 'தேவைகள்',
    subtitle: 'பேரிடருக்குப் பிந்தைய மதிப்பீடு',
    liveMap: 'நேரடி வரைபடம்',
    analytics: 'பகுப்பாய்வு',
    emergencyNav: 'அவசர எண்கள்',
    heroTag: 'தேவைகள் மதிப்பீடு செயலில் உள்ளது',
    heroTitle: 'பேரிடருக்குப் பிந்தைய தேவைகள் மதிப்பீடு',
    heroDesc: 'மீட்பு மற்றும் மறுசீரமைப்பிற்குத் தேவையான வளங்களைத் தீர்மானிக்க வீடுகள், வணிகங்கள் மற்றும் வாகனங்களுக்கு ஏற்பட்ட சேதங்கள் குறித்த தரவுகளைச் சேகரிக்கவும்.',
    
    // Form
    submitReport: 'மதிப்பீட்டைச் சமர்ப்பிக்கவும்',
    location: 'இடம்',
    selectOnMap: 'வரைபடத்தில் தேர்ந்தெடுக்கவும்',
    pickLocation: 'முதலில் இடத்தைத் தேர்ந்தெடுக்கவும்',
    home: 'வீடு',
    business: 'வணிகம்',
    vehicle: 'வாகனம்',
    
    // Home Form
    occupantsAge: 'வயது வாரியாக குடியிருப்பாளர்கள்',
    years: 'வயது',
    damageAssessment: 'சேத மதிப்பீடு',
    
    // Business Form
    businessScale: 'வணிக அளவு',
    severityAssessment: 'தீவிரத்தன்மை மதிப்பீடு',
    small: 'சிறிய',
    medium: 'நடுத்தர',
    large: 'பெரிய',
    
    // Vehicle Form
    vehicleType: 'வாகன வகை',
    quantity: 'எண்ணிக்கை',
    
    // Common Form
    evidencePhoto: 'ஆதார புகைப்படம் (விருப்பத் தேர்வு)',
    clickToUpload: 'படத்தைப் பதிவேற்ற கிளிக் செய்யவும்',
    describeDetails: 'மீட்புத் தேவைகளை இங்கே விவரிக்கவும்...',
    
    // Dashboard
    impactAnalytics: 'தேவைகள் பகுப்பாய்வு',
    analyticsDesc: 'வெள்ளம் மற்றும் நிலச்சரிவு மீட்புத் தேவைகளின் ஒருங்கிணைந்த தரவு.',
    homes: 'வீடுகள்',
    avgDamage: 'சராசரி சேதம்',
    businesses: 'வணிகங்கள்',
    commercial: 'வர்த்தகம்',
    vehicles: 'வாகனங்கள்',
    criticalLoss: 'முக்கிய இழப்பு',
    affectedPeople: 'பாதிக்கப்பட்ட மக்கள்',
    displaced: 'இடம்பெயர்ந்தோர்',
    ageDemographics: 'வயது புள்ளிவிவரங்கள்',
    ageDesc: 'ஆதரவு தேவைப்படும் மக்கள் தொகை விநியோகம்.',
    vehicleLosses: 'வாகன இழப்புகள்',
    vehicleDesc: 'இழந்த போக்குவரத்து வளங்களின் விவரம்.',
    businessImpactScale: 'வணிக தாக்க அளவு',
    businessDesc: 'தேவைப்படும் பொருளாதார மீட்பு அளவு.',
    
    // Map
    residents: 'குடியிருப்பாளர்கள்',
    damage: 'சேதம்',
    size: 'அளவு',
    count: 'எண்ணிக்கை',
    type: 'வகை',

    // Emergency Page
    emergencyNumbers: 'அவசர எண்கள்',
    sriLanka: 'LK இலங்கை',
    emergency: 'அவசர உதவி',
    police: 'காவல்துறை',
    fireBrigade: 'தீயணைப்பு படை',
    ambulance: 'ஆம்புலன்ஸ்',
    tapToCall: 'அழைக்க தட்டவும்',
    importantNotice: 'முக்கியம்: உயிருக்கு ஆபத்தான அவசரநிலைகளுக்கு, முதலில் 117 ஐ அழைக்கவும்.',
    
    // Footer
    footerInfo: 'இந்த தளம் கள விஜயங்கள் மூலம் சேகரிக்கப்பட்ட பொதுமக்களின் தகவல்களைப் பயன்படுத்துகிறது.',
    developer: 'உருவாக்கியவர்: சுபோத கல்ஹார'
  }
};