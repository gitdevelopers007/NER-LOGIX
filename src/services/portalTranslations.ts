export type SupportedLanguage = 'en' | 'hi' | 'as' | 'bn' | 'mni';

export interface PortalTranslation {
  // Header
  platform_title_line1: string;
  platform_title_line2: string;
  system_online: string;
  help: string;
  select_language: string;
  help_modal_title: string;
  help_modal_desc: string;

  // Breadcrumb & Page Titles
  back_to_welcome: string;
  breadcrumb_portal: string;
  portal_heading: string;
  portal_subheading: string;

  // Card 1: Government Command Center
  card1_title: string;
  card1_subtitle: string;
  card1_desc: string;
  card1_feat1: string;
  card1_feat2: string;
  card1_feat3: string;
  card1_feat4: string;
  card1_btn: string;

  // Card 2: Field Operations
  card2_title: string;
  card2_subtitle: string;
  card2_desc: string;
  card2_feat1: string;
  card2_feat2: string;
  card2_feat3: string;
  card2_feat4: string;
  card2_btn: string;

  // Card 3: Traveler & Public Access
  card3_title: string;
  card3_subtitle: string;
  card3_desc: string;
  card3_feat1: string;
  card3_feat2: string;
  card3_feat3: string;
  card3_feat4: string;
  card3_btn: string;

  // Security Footer
  secure_platform: string;
  secure_desc: string;

  // Traveler Modal
  traveler_modal_title: string;
  traveler_status_title: string;
  traveler_status_desc: string;
  traveler_notice: string;
  close: string;
}

export const PORTAL_TRANSLATIONS: Record<SupportedLanguage, PortalTranslation> = {
  en: {
    platform_title_line1: 'North Eastern Region Logistics &',
    platform_title_line2: 'Accessibility Intelligence',
    system_online: 'System Online',
    help: 'Help',
    select_language: 'Select Language',
    help_modal_title: 'NER-LOGIX Help & Support',
    help_modal_desc: 'Access regional accessibility maps, road condition feeds, disaster advisories, and administrative intelligence for the 8 North Eastern states.',

    back_to_welcome: 'Back to Welcome',
    breadcrumb_portal: 'Access Portal',
    portal_heading: 'Select Your Access Portal',
    portal_subheading: 'Choose how you want to access the North Eastern Region Logistics & Accessibility Intelligence platform.',

    card1_title: 'Government Command Center',
    card1_subtitle: 'For government officials and administrators',
    card1_desc: 'Monitor regional connectivity, road accessibility, incidents, logistics operations, weather risks, and AI-generated intelligence.',
    card1_feat1: 'Regional accessibility monitoring',
    card1_feat2: 'Incident & risk intelligence',
    card1_feat3: 'Logistics oversight',
    card1_feat4: 'Analytics & reports',
    card1_btn: 'Continue as Government User',

    card2_title: 'Field Operations',
    card2_subtitle: 'For field officers and ground teams',
    card2_desc: 'Report road conditions, incidents, bridge status, disruptions, photographs, and real-time field observations.',
    card2_feat1: 'Submit field reports',
    card2_feat2: 'Capture incident locations',
    card2_feat3: 'Upload photographs',
    card2_feat4: 'Offline-friendly reporting',
    card2_btn: 'Continue as Field User (PWA)',

    card3_title: 'Traveler & Public Access',
    card3_subtitle: 'For travelers and citizens',
    card3_desc: 'Check road accessibility, weather conditions, disruptions, safer routes, and travel information across the North Eastern Region.',
    card3_feat1: 'Check road status',
    card3_feat2: 'View disruptions',
    card3_feat3: 'Weather & risk information',
    card3_feat4: 'Route recommendations',
    card3_btn: 'Continue as Traveler',

    secure_platform: 'Secure Government Platform',
    secure_desc: 'Data access is based on user role and authorization.',

    traveler_modal_title: 'Public Traveler Advisory',
    traveler_status_title: 'North Eastern Corridors Active',
    traveler_status_desc: 'Arterial corridors (NH-27, NH-29, NH-10) are currently monitored in real time. Please drive with caution in high-rainfall mountain passes.',
    traveler_notice: 'Official IMD and BRO clearance advisories are updated continuously every 15 minutes.',
    close: 'Close',
  },

  as: {
    platform_title_line1: 'উত্তৰ-পূব অঞ্চল লজিষ্টিক আৰু',
    platform_title_line2: 'প্ৰৱেশগম্যতা বুদ্ধিমত্তা মঞ্চ',
    system_online: 'অনলাইন প্ৰণালী',
    help: 'সহায়',
    select_language: 'ভাষা বাছনি কৰক',
    help_modal_title: 'NER-LOGIX সহায় আৰু তথ্য কেন্দ্ৰ',
    help_modal_desc: 'উত্তৰ-পূৰ্বাঞ্চলৰ ৮খন ৰাজ্যৰ আঞ্চলিক পথ যোগাযোগ, দুৰ্যোগ সতৰ্কবাৰ্তা আৰু চৰকাৰী কমাণ্ড সেৱাসমূহ চাবলৈ সহায় লওক।',

    back_to_welcome: 'স্বাগতম পৃষ্ঠালৈ উভতি যাওক',
    breadcrumb_portal: 'প্ৰৱেশ প’ৰ্টেল',
    portal_heading: 'আপোনাৰ প্ৰৱেশ প’ৰ্টেল বাছক',
    portal_subheading: 'উত্তৰ-পূব অঞ্চল লজিষ্টিক আৰু প্ৰৱেশগম্যতা বুদ্ধিমত্তা মঞ্চত প্ৰৱেশৰ বাবে মাধ্যম বাছক।',

    card1_title: 'চৰকাৰী কমাণ্ড চেণ্টাৰ',
    card1_subtitle: 'চৰকাৰী বিষয়া আৰু প্ৰশাসকসকলৰ বাবে',
    card1_desc: 'আঞ্চলিক পথ সংযোগ, সুগম্যতা, দুৰ্যোগ, লজিষ্টিক অভিযান, বতৰৰ বিপদাশংকা আৰু AI আধাৰিত তথ্য পৰ্যবেক্ষণ কৰক।',
    card1_feat1: 'আঞ্চলিক সুগম্যতা নিৰীক্ষণ',
    card1_feat2: 'দুৰ্যোগ আৰু ঘটনাৰ তথ্য',
    card1_feat3: 'লজিষ্টিক অভিযান পৰিচালনা',
    card1_feat4: 'বিশ্লেষণ আৰু প্ৰতিবেদন',
    card1_btn: 'চৰকাৰী ব্যৱহাৰকাৰী হিচাপে প্ৰৱেশ কৰক',

    card2_title: 'ক্ষেত্ৰ পৰিচালনা',
    card2_subtitle: 'ক্ষেত্ৰ বিষয়া আৰু ভূমি গোটসমূহৰ বাবে',
    card2_desc: 'পথৰ অৱস্থা, ভূমিস্খলন, দলঙৰ ক্ষতি, ফটো আৰু বাস্তৱ সময়ৰ ক্ষেত্ৰ নিৰীক্ষণ প্ৰতিবেদন দাখিল কৰক।',
    card2_feat1: 'ক্ষেত্ৰ প্ৰতিবেদন দাখিল',
    card2_feat2: 'ঘটনাৰ GPS স্থান সংগ্ৰহ',
    card2_feat3: 'ফটো আপলোড কৰক',
    card2_feat4: 'অফলাইন-অনুকূল প্ৰতিবেদন',
    card2_btn: 'ক্ষেত্ৰ ব্যৱহাৰকাৰী (PWA) হিচাপে প্ৰৱেশ কৰক',

    card3_title: 'যাত্ৰী আৰু ৰাজহুৱা প্ৰৱেশ',
    card3_subtitle: 'যাত্ৰী আৰু সাধাৰণ নাগৰিকৰ বাবে',
    card3_desc: 'উত্তৰ-পূব অঞ্চলৰ পথৰ সুগম্যতা, বতৰৰ অৱস্থা, বাধা, নিৰাপদ বিকল্প পথ আৰু ভ্ৰমণৰ তথ্য পৰীক্ষা কৰক।',
    card3_feat1: 'পথৰ স্থিতি পৰীক্ষা কৰক',
    card3_feat2: 'বাধা আৰু অৱৰোধ চাওক',
    card3_feat3: 'বতৰ আৰু বিপদৰ তথ্য',
    card3_feat4: 'নিৰাপদ পথ পৰামৰ্শ',
    card3_btn: 'যাত্ৰী হিচাপে প্ৰৱেশ কৰক',

    secure_platform: 'সুৰক্ষিত চৰকাৰী মঞ্চ',
    secure_desc: 'তথ্যৰ প্ৰৱেশাধিকাৰ ব্যৱহাৰকাৰীৰ ভূমিকা আৰু অনুমোদনৰ ওপৰত নিৰ্ভৰশীল।',

    traveler_modal_title: 'ৰাজহুৱা যাত্ৰী পৰামৰ্শ',
    traveler_status_title: 'উত্তৰ-পূব ঘাইপথ সক্ৰিয় নিৰীক্ষণত',
    traveler_status_desc: 'প্ৰধান ৰাষ্ট্ৰীয় ঘাইপথসমূহ (NH-27, NH-29, NH-10) বাস্তৱ সময়ত নিৰীক্ষণ কৰা হৈছে। বৰষুণৰ পাহাৰীয়া অঞ্চলত সতৰ্কতাৰে গাড়ী চলাওক।',
    traveler_notice: 'ভাৰতীয় বতৰ বিজ্ঞান বিভাগ (IMD) আৰু BRO ৰ অনুমোদন প্ৰতি ১৫ মিনিটত নবীকৰণ কৰা হয়।',
    close: 'বন্ধ কৰক',
  },

  hi: {
    platform_title_line1: 'उत्तर पूर्वी क्षेत्र लॉजिस्टिक्स एवं',
    platform_title_line2: 'पहुंच आसूचना मंच',
    system_online: 'सिस्टम ऑनलाइन',
    help: 'मदद',
    select_language: 'भाषा चुनें',
    help_modal_title: 'NER-LOGIX सहायता एवं समर्थन',
    help_modal_desc: 'पूर्वोत्तर के 8 राज्यों के लिए क्षेत्रीय पहुंच मानचित्र, सड़क स्थिति फ़ीड, आपदा सलाह और प्रशासनिक जानकारी प्राप्त करें।',

    back_to_welcome: 'स्वागत पृष्ठ पर वापस जाएं',
    breadcrumb_portal: 'एक्सेस पोर्टल',
    portal_heading: 'अपना एक्सेस पोर्टल चुनें',
    portal_subheading: 'उत्तर पूर्वी क्षेत्र लॉजिस्टिक्स और पहुंच आसूचना मंच तक पहुंचने का अपना माध्यम चुनें।',

    card1_title: 'सरकारी कमांड सेंटर',
    card1_subtitle: 'सरकारी अधिकारियों और प्रशासकों के लिए',
    card1_desc: 'क्षेत्रीय कनेक्टिविटी, सड़क पहुंच, घटनाएं, रसद संचालन, मौसम जोखिम और एआई-जनित बुद्धिमत्ता की निगरानी करें।',
    card1_feat1: 'क्षेत्रीय पहुंच निगरानी',
    card1_feat2: 'घटना एवं जोखिम आसूचना',
    card1_feat3: 'लॉजिस्टिक्स निगरानी',
    card1_feat4: 'एनालिटिक्स एवं रिपोर्ट',
    card1_btn: 'सरकारी उपयोगकर्ता के रूप में जारी रखें',

    card2_title: 'फील्ड ऑपरेशंस',
    card2_subtitle: 'फील्ड अधिकारियों और जमीनी टीमों के लिए',
    card2_desc: 'सड़क की स्थिति, घटनाएं, पुल की स्थिति, रुकावटें, तस्वीरें और वास्तविक समय के फील्ड अवलोकन रिपोर्ट करें।',
    card2_feat1: 'फील्ड रिपोर्ट दर्ज करें',
    card2_feat2: 'घटना स्थल कैप्चर करें',
    card2_feat3: 'तस्वीरें अपलोड करें',
    card2_feat4: 'ऑफलाइन-अनुकूल रिपोर्टिंग',
    card2_btn: 'फील्ड उपयोगकर्ता (PWA) के रूप में जारी रखें',

    card3_title: 'यात्री एवं सार्वजनिक पहुंच',
    card3_subtitle: 'यात्रियों और नागरिकों के लिए',
    card3_desc: 'उत्तर पूर्वी क्षेत्र में सड़क पहुंच, मौसम की स्थिति, व्यवधान, सुरक्षित मार्ग और यात्रा जानकारी जांचें।',
    card3_feat1: 'सड़क की स्थिति जांचें',
    card3_feat2: 'व्यवधान देखें',
    card3_feat3: 'मौसम एवं जोखिम जानकारी',
    card3_feat4: 'सुरक्षित मार्ग सिफारिशें',
    card3_btn: 'यात्री के रूप में जारी रखें',

    secure_platform: 'सुरक्षित सरकारी मंच',
    secure_desc: 'डेटा एक्सेस उपयोगकर्ता की भूमिका और प्राधिकरण पर आधारित है।',

    traveler_modal_title: 'सार्वजनिक यात्री परामर्श',
    traveler_status_title: 'उत्तर पूर्वी गलियारे सक्रिय निगरानी में',
    traveler_status_desc: 'प्रमुख राष्ट्रीय राजमार्गों (NH-27, NH-29, NH-10) की वास्तविक समय में निगरानी की जा रही है। बारिश वाले पहाड़ी इलाकों में सावधानी से वाहन चलाएं।',
    traveler_notice: 'मौसम विभाग और बीआरओ की आधिकारिक सलाह हर 15 मिनट में अपडेट की जाती है।',
    close: 'बंद करें',
  },

  bn: {
    platform_title_line1: 'উত্তর-পূর্বাঞ্চল লজিস্টিক ও',
    platform_title_line2: 'অ্যাক্সেসিবিলিটি ইন্টেলিজেন্স',
    system_online: 'সিস্টেম অনলাইন',
    help: 'সাহায্য',
    select_language: 'ভাষা নির্বাচন করুন',
    help_modal_title: 'NER-LOGIX সহায়তা ও তথ্য',
    help_modal_desc: 'উত্তর-পূর্বাঞ্চলের ৮টি রাজ্যের আঞ্চলিক অ্যাক্সেসিবিলিটি ম্যাপ, রাস্তার পরিস্থিতি, দুর্যোগ সতর্কতা এবং প্রশাসনিক তথ্য দেখুন।',

    back_to_welcome: 'স্বাগতম পৃষ্ঠায় ফিরে যান',
    breadcrumb_portal: 'অ্যাক্সেস পোর্টাল',
    portal_heading: 'আপনার অ্যাক্সেস পোর্টাল নির্বাচন করুন',
    portal_subheading: 'উত্তর-পূর্বাঞ্চল লজিস্টিক ও অ্যাক্সেসিবিলিটি ইন্টেলিজেন্স প্ল্যাটফর্মে প্রবেশের জন্য মাধ্যম বেছে নিন।',

    card1_title: 'সরকারি কমান্ড সেন্টার',
    card1_subtitle: 'সরকারি কর্মকর্তা ও প্রশাসকদের জন্য',
    card1_desc: 'আঞ্চলিক যোগাযোগ, রাস্তার অবস্থা, দুর্যোগ, লজিস্টিক কার্যক্রম, আবহাওয়া ঝুঁকি এবং এআই বুদ্ধিমত্তা পর্যবেক্ষণ করুন।',
    card1_feat1: 'আঞ্চলিক সুগম্যতা পর্যবেক্ষণ',
    card1_feat2: 'দুর্যোগ ও ঝুঁকি বুদ্ধিমত্তা',
    card1_feat3: 'লজিস্টিক কার্যক্রম তদারকি',
    card1_feat4: 'অ্যানালিটিক্স ও রিপোর্ট',
    card1_btn: 'সরকারি ব্যবহারকারী হিসেবে এগিয়ে যান',

    card2_title: 'ফিল্ড অপারেশনস',
    card2_subtitle: 'মাঠ পর্যায়ের কর্মকর্তা ও গ্রাউন্ড দলের জন্য',
    card2_desc: 'রাস্তার অবস্থা, ঘটনা, সেতুর অবস্থা, ব্যাঘাত, ছবি এবং সরাসরি মাঠের পর্যবেক্ষণ রিপোর্ট করুন।',
    card2_feat1: 'মাঠের প্রতিবেদন জমা দিন',
    card2_feat2: 'ঘটনাস্থল জিপিএস ক্যাপচার',
    card2_feat3: 'ছবি আপলোড করুন',
    card2_feat4: 'অফলাইন-অনুকূল রিপোর্টিং',
    card2_btn: 'ফিল্ড ব্যবহারকারী (PWA) হিসেবে এগিয়ে যান',

    card3_title: 'যাত্রী ও সাধারণ জনগণের প্রবেশাধিকার',
    card3_subtitle: 'যাত্রী ও সাধারণ নাগরিকদের জন্য',
    card3_desc: 'উত্তর-পূর্ব অঞ্চলে রাস্তার অবস্থা, আবহাওয়া, ব্যাঘাত, নিরাপদ রুট এবং ভ্রমণ তথ্য দেখুন।',
    card3_feat1: 'রাস্তার অবস্থা পরীক্ষা করুন',
    card3_feat2: 'সড়ক ব্যাঘাত দেখুন',
    card3_feat3: 'আবহাওয়া ও ঝুঁকি তথ্য',
    card3_feat4: 'নিরাপদ রুট সুপারিশ',
    card3_btn: 'যাত্রী হিসেবে এগিয়ে যান',

    secure_platform: 'সুরক্ষিত সরকারি প্ল্যাটফর্ম',
    secure_desc: 'তথ্য অ্যাক্সেস ব্যবহারকারীর ভূমিকা এবং অনুমোদনের উপর ভিত্তি করে।',

    traveler_modal_title: 'পাবলিক ট্রাভেলার অ্যাডভাইজরি',
    traveler_status_title: 'উত্তর-পূর্ব করিডোর সক্রিয় নজরদারিতে',
    traveler_status_desc: 'প্রধান মহাসড়কগুলো (NH-27, NH-29, NH-10) রিয়েল-টাইমে পর্যবেক্ষণ করা হচ্ছে। বৃষ্টিবহুল পাহাড়ি রাস্তায় সাবধানে গাড়ি চালান।',
    traveler_notice: 'আইএমডি এবং বিআরও ক্লিয়ারেন্স প্রতি ১৫ মিনিট অন্তর আপডেট করা হয়।',
    close: 'বন্ধ করুন',
  },

  mni: {
    platform_title_line1: 'নোর্থ ইস্টার্ন রিজন লোজিস্তিক্স অমসুং',
    platform_title_line2: 'এক্সেসিবিলিতি ইন্টেলিজেন্স',
    system_online: 'সিস্টেম অনলাইন',
    help: 'মতেং',
    select_language: 'লোন খনবীয়ু',
    help_modal_title: 'NER-LOGIX হেল্প অমসুং সপোর্ত',
    help_modal_desc: 'নোর্থ ইস্তকী স্তেত ৮গী লম্বী-থোং, অমাং-অতা অমসুং লোজিস্তিক্সকী পাউ খঙনবগীদমক মতেং লৌবীয়ু।',

    back_to_welcome: 'ৱেলকম পেজদা অমুক হন্না চৎপা',
    breadcrumb_portal: 'এক্সেস পোৰ্টেল',
    portal_heading: 'নহাক্কী এক্সেস পোৰ্টেল খনবীয়ু',
    portal_subheading: 'নোর্থ ইস্টার্ন রিজন লোজিস্তিক্স অমসুং এক্সেসিবিলিতি প্লেটফোর্মদা চঙনবা লম্বী খনবীয়ু।',

    card1_title: 'লৈঙাক্কী কমাণ্ড সেন্টর',
    card1_subtitle: 'লৈঙাক্কী ওফিসার অমসুং প্রসাশকশিংগীদমক',
    card1_desc: 'লমদমসিগী লম্বী-থোং, অমাং-অতা, লোজিস্তিক্স অমসুং নোং-চিংগী ফীভম নৈনবীয়ু।',
    card1_feat1: 'লম্বী-থোংগী ফীভম নৈনবা',
    card1_feat2: 'খুদোংথিবা অমসুং রিক্স ইন্টেলিজেন্স',
    card1_feat3: 'লোজিস্তিক্স মিতয়েং থম্বা',
    card1_feat4: 'এনালিটিক্স অমসুং রিপোর্ত',
    card1_btn: 'লৈঙাক্কী মীহুৎ ওইনা চঙবীয়ু',

    card2_title: 'মফমদা চৎতুনা থবক তৌবা',
    card2_subtitle: 'মফমদা লৈবা দলশিংগীদমক',
    card2_desc: 'লম্বী-থোংগী ফীভম, ফোতো অমসুং হৌজিক্কী ওবজার্ভেসন রিপোর্ত তৌবীয়ু।',
    card2_feat1: 'ফিল্ড রিপোর্ত পীবা',
    card2_feat2: 'থৌদোক্কী GPS কাঁপচর তৌবা',
    card2_feat3: 'ফোতো অপলোদ তৌবা',
    card2_feat4: 'ওফলাইনদা রিপোর্ত তৌবা',
    card2_btn: 'ফিল্ড য়ুজর (PWA) ওইনা চঙবীয়ু',

    card3_title: 'খোঙচৎপা অমসুং মীয়ামগী এক্সেস',
    card3_subtitle: 'খোঙচৎপা অমসুং প্রজাশিংগীদমক',
    card3_desc: 'নোর্থ ইস্ততা লম্বীগী ফীভম, নোং-চিং অমসুং সেফ রুতশিং য়েংবীয়ু।',
    card3_feat1: 'লম্বীগী ফীভম য়েংবা',
    card3_feat2: 'থেংনরিবা অপনবশিং য়েংবা',
    card3_feat3: 'নোং-চিং অমসুং রিক্স পাউ',
    card3_feat4: 'সেফ রুত রিকমেন্দেসন',
    card3_btn: 'খোঙচৎপা ওইনা চঙবীয়ু',

    secure_platform: 'অচেৎপা লৈঙাক্কী প্লেটফোর্ম',
    secure_desc: 'দেতা এক্সেস অসি ওথোরাইজেসনগী মতুং ইন্না পীরি।',

    traveler_modal_title: 'মীয়ামগী খোঙচৎপা পাউতাক',
    traveler_status_title: 'নোর্থ ইস্তকী মরুওইবা লম্বীশিং নৈনরি',
    traveler_status_desc: 'মরুওইবা হাইৱেশিং (NH-27, NH-29, NH-10) হৌজিক য়েংশিল্লি। নোং কন্না চুবদা চেকশিন্না গারী থৌবীয়ু।',
    traveler_notice: 'IMD অমসুং BRO গী পাউতাকশিং মিনিট ১৫ খুদিংগী নৌনা পীরি।',
    close: 'থিংশিনবা',
  },
};
