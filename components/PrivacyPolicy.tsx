import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const PrivacyPolicy = () => {
  const {goBack} = useNavigation();
  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color="white" />
          </TouchableOpacity>
        }
        sizeprop={size.md}
        title={false}
        children={
          <Text style={styles.accountName}>Privacy Policy</Text>}
        width={'80%'}
        rightChildrenWidth={'10%'}
        leftChildrenWidth = {'10%'}
      />
      <ScrollView style={{marginHorizontal:moderateScale(20)}}>
        <View style={{marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                1.
              </Text>
              What Kind of Personal Information We Collect
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}>1.1.</Text>
            This Privacy Policy describes how NAPA Society Inc. (“NAPA”, “we”,
            “us” or “our”) handles personal information that we collect through
            the NAPA website available at www.napasociety.io and application on
            the Google Play and Apple store by the name NAPA Society
            (collectively referred to as “Website”) activities and features that
            link to this Privacy Policy, through social media and marketing
            activities, and if you avail or inquire about services including the
            social media platform, NFT marketplace, and other activities
            described in this Privacy Policy (collectively, the “Services”, each
            a “Service”). Users, customers, visitors and vendors are
            collectively referred to as “you”, “your” or “User”. 
            {'\n'}
            This Privacy Policy describes the information, which shall mean to include
            personally identifiable information, that we collect about you
            (“Personal Information”), how we collect it, the purpose of such
            collection, processing of this Personal Information, how and why we
            share this Personal Information, the period of retaining this
            Personal Information with us, and how to review, update or request
            deletion of your Personal Information. By using or accessing the
            Website, you hereby agree to the terms of this Privacy Policy,
            especially the terms with respect to collection, storage, processing
            and sharing of your Personal Information. If you disagree with this
            Privacy Policy please do not use or access our Website. This policy
            applies where we are acting as a data controller with respect to the
            Personal Information of such persons; in other words, where we
            determine the purposes and means of the processing of that Personal
            Information. 
            {'\n'}
            This Privacy Policy does not apply to any website(s),
            mobile sites and mobile apps of third parties, even if their
            websites/products are linked to our Platforms. Users should take
            note that information and privacy practices of our business
            partners, advertisers, sponsors or other sites to which NAPA
            provides hyperlink(s), may be materially different from this Privacy
            Policy. Accordingly, it is recommended that you review the privacy
            statements and policies of any such third parties with whom they
            interact. 
            {'\n'}
            NAPA is committed to protecting and respecting your
            privacy. This Privacy Policy explains the basis on which Personal
            Information we collect from you will be processed by us or on our
            behalf. Where we decide the purpose and means for which Personal
            Information you supply through this Service is processed, we are the
            “controller” for the purposes of the General Data Protection
            Regulation 2016/679 (“EU GDPR”), the GDPR as it forms part of the
            laws of England, Wales, Scotland and Northern Ireland by virtue of
            section 3 of the European Union (Withdrawal) Act 2018 (“UK GDPR” and
            together with the EU GDPR, the “GDPR”) and the UK Data Protection
            Act 2018 (“UKDPA”). NAPA will comply with all applicable data
            protection laws, including the GDPR, UKDPA and the California
            Consumer Privacy Act 2018 (“CCPA”). 
            {'\n'}
            Please read this Privacy Policy
            carefully as it contains important information about the following:
            {'\n'}
            ● What Personal Information we may collect about you.
            {'\n'} 
            ● How do we use the Personal Information we collect about you? 
            {'\n'}
            ● Whether we disclose your Personal Information to any third-parties. 
            {'\n'}
            ● How do we protect your Personal Information? 
            {'\n'}
            ● Your choices and rights regarding the Personal Information we hold about you. 
            {'\n'}
            This Privacy Policy should be read in conjunction with our Terms of Service as
            may be applicable in respect of the Service. 
            {'\n'}
            Where Terms of Service are applicable, they will be made available via the Service. The
            Service may contain hyperlinks to services owned and operated by
            third parties. These third-party services may have their own privacy
            policies and we recommend that you review them. They will govern the
            use of Personal Information that you submit or which is collected by
            cookies and other tracking technologies whilst using these services.
            We do not accept any responsibility or liability for the privacy
            practices of such third-party services and your use of these is at
            your own risk. The third-party websites are not under the control of
            NAPA and NAPA is not responsible for the content of any third-party
            websites and/or any links contained in the third-party websites.
            NAPA is providing these links to the third-party websites to you
            only for your convenience and NAPA is not responsible for any kind
            of loss/ damage arising out of it and the access to or any other act
            on such third party links shall be entirely at your risk. 
            {'\n'}
            If you do not agree with or you are not comfortable with any aspect of this
            Privacy Policy, you should immediately discontinue access or use of
            the Services. 
            {'\n'}
            We may make changes to this Privacy Policy in the
            future, which will be made available here. You should check here
            from time to time to ensure you are aware of any changes. Where
            appropriate, we may notify you of changes through the Service.
          </Text>
        </View>
        {/* <View
          style={{flexDirection: 'row', paddingVertical: verticalScale(20)}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}> 1.2.</Text>
            Identity information: name, facial image, social security number, ID
            number, documents proving your identity and any other information
            they may contain.
          </Text>
        </View> */}
        <View style={{paddingTop: verticalScale(10)}}>
          <Text style={[styles.headingText]}>
            <Text style={[styles.headingText, {color: themeColors.garyColor}]}>
              2.
            </Text>
            INFORMATION WE MAY COLLECT ABOUT YOU
          </Text>
          <Text>
            {' '}
            We may make changes to this Privacy Policy in the future, which will be made available here. You should check here from time to time to ensure you are aware of any changes. Where appropriate, we may notify you of changes through the Service. 
          </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              <Text style={[{color: themeColors.garyColor}]}>2.1.</Text>
              Information that may be provided by you when creating a Service
              account (“Submitted Information”)
              {'\n'} 
              ● Your Wallet Address; 
              {'\n'}
              ● Technical Information relating to the wallet interface;
              {'\n'}
              ● Your name and e-mail address.
            </Text>
          </View>
        </View>
        <Text style={[styles.descriptionText]}>
          <Text style={[{color: themeColors.garyColor}]}>2.2.</Text> Information
          that may be provided by you when you contact us for support (“Support
          Information”) 
          {'\n'}
          ● Your email address; and 
          {'\n'}
          ● Your contact number if
          required.
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>2.3.</Text>
            Information from Third Parties We obtain information from
            third-party sources. For example, we may collect information about
            you from identity verification services, data analytics providers,
            and mailing list providers (if applicable).
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>2.4.</Text>
            Information about your Activities (“Technical and Usage
            Information”) We may collect technical and usage information about
            your use of our Service through tracking technologies and analytics
            collection in our Services. Personal Information we may collect in
            this way includes: ● IP address; ● Geolocation information (i.e.
            longitude and latitude); o Service user ID (a unique ID that we
            generate which identifies Service users); ● Device information (such
            as your device ID, operating system and version, device brand,
            device family, model and manufacturer); ● Mobile network carrier (if
            applicable); ● Country, market and region information; ● Language; ●
            Error and crash data (identifying a Service crash event); ●
            Advertising identifier numbers (such as IDFA (iOS devices) and ADID
            (Android devices)); and ● Events related to your Service usage, such
            as achievement of a milestone and the occurrence of other events
            during your Service usage (such as virtual currency balance, NFT
            information, session durations and your choices and progression for
            and in different parts of the Service).
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>2.5.</Text>
            Analytics and profile information (“Analytics and Behavioural Data”)
            We may collect, or create by analysis of other Services Information,
            analytical information in connection with your Service usage
            including without limitation: ● When you first launched / began
            using the Service; ● Whether you use our free Services, or whether
            you use paid-for Services and how much you spend; ● Whether you
            discovered our Service organically, or whether you discovered the
            Service through an advertising campaign; ● What your Service usage
            habits are (for example, whether you use the Service in a particular
            way or only use a part of the Service and how often you use it); and
            ● We may associate your account with a user segment group which we
            think have shared characteristics, such as perceived interest in
            particular parts of our Services.
          </Text>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                3.
              </Text>
              HOW DO WE USE THE PERSONAL INFORMATION COLLECTED
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.1.</Text>
            We process your Submitted Information for the purpose of ensuring
            that the funds held in the ETH wallet do not present a risk of
            money-laundering. We may conduct verification checks through the
            transaction history associated with the ETH address, as publicly
            viewable on the Ethereum blockchain. We may do this for our
            legitimate interests of ensuring that your use of our Services is
            lawful and in compliance with our agreement (being the Terms of
            Service agreed between us), to prevent disruption to our Service, to
            enforce our rights, to protect any individual or otherwise to ensure
            our compliance with our legal obligations.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.2.</Text>
            We may process certain of your Services Information (including your
            Support Information and certain other Services Information which
            might be relevant) so that we are able to properly respond to your
            enquiries and support requests, in accordance with the Terms of
            Service agreed between us. For the above purposes, we rely upon the
            legal basis of performance of a contract (being our Terms of Service
            with you for the Service).
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.3.</Text>
            We may use and share this anonymous, aggregated or de-identified
            information for any lawful business purpose, including to better
            understand customer needs and behaviors, analyze and improve the
            Services, promote our business, conduct business intelligence and
            marketing, perform analytics or enable analytics provided by third
            parties, and detect security threats.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.4.</Text>
            Enable your use of the Services and features on the Website.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.5.</Text>
            Inform you about new features on the Website
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.6.</Text>
            Develop, enhance, market and deliver the services to you.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.7</Text>
            Understand your needs and your eligibility for availing the
            services.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.8</Text>
            Send statements, invoices and payment reminders to you, and collect
            payments from you.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.9</Text>
            Enable you to download information/white papers/documents you have
            requested.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.10</Text>
            For analytics and statistical purposes.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.11</Text>
            To conduct audits and quality assessment procedures.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.12</Text>
            Conduct surveys and receive feedback from you.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.13</Text>
            Meet NAPA’s legal and regulatory requirements, comply with KYC, AML
            and other applicable laws.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.14</Text>
            Keep our Website secure and prevent fraud.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.15</Text>
            If we believe your actions are inconsistent with our terms of
            service and applicable terms or policies.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>3.16</Text>
            We may also process your Personal Information where such processing
            is necessary for compliance with a legal obligation to which we are
            subject or in order to protect your vital interests or the vital
            interests of another natural person.
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                4.
              </Text>
              COOKIES
            </Text>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              A cookie is a text file placed onto your device when you access
              our Services. We use cookies and other similar or equivalent
              online tracking devices such as web beacons, standard development
              kits (for mobile) and flash object storage to deliver, improve and
              monitor our websites, applications and games, including in the
              following ways:
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>4.1</Text>
            Authentication: To log you into our Service and keep you logged in.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>4.2</Text>
            Service delivery: To deliver our Services and third-party services
            which may be embedded into our own Services (such as social media
            network connectivity).
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>4.3</Text>
            Preferences: To remember information about your preferences such as
            your preferred language and configuration.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>4.4</Text>
            Analytics: To help us understand how you use our Services, such as
            how often, so we can improve Services and deliver a better
            experience and also for us to carry out research and statistical
            analysis to help us develop new products and services.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>4.5</Text>
            Advertising: To help us deliver in-Service advertising to you (which
            may be served by, or facilitated by, third parties). These are also
            used to help us and our partners measure the effectiveness of
            advertising and whether it was actually served to you. The
            information we obtain from our use of cookies will not usually
            contain your Personal Information. Although we may obtain
            information about your device such as your advertiser ID, IP
            address, your browser and/or other internet log information, this
            will not usually identify you personally. Please note that if you
            choose to disable cookies, or similar technologies, on your device
            you may be unable to make full use of our Services or may not have
            the same quality of experience. We may work with third parties who
            may also set cookies and equivalent technologies on our Services,
            for example: Google Analytics, Google AdWords, YouTube, Facebook,
            Twitter and LinkedIn, which we use to display video content, enable
            social networking functionality and sharing, and to monitor how
            visitors use our Services.
          </Text>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                5.
              </Text>
              DATA SHARING & PROCESSING
            </Text>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              {' '}
              We will share your Personal Information with third parties only in
              the ways that are described in this Privacy Policy.
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.1</Text>
            Group members, personnel, suppliers or subcontractors from time to
            time: We keep your Personal Information confidential but may
            disclose it to any member of our group (which means our
            subsidiaries, our ultimate holding company and its subsidiaries),
            our personnel, our advertising and analytics service providers and
            our other suppliers or subcontractors insofar as it is reasonably
            necessary for the purposes set out in this Privacy Policy. By using
            the Website and availing our Services, you accept the terms hereof
            and hereby consent to the storage and processing of Personal
            Information by third parties.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.2</Text>
            Payment providers: Where you initiate a payment with us, your
            payment related information will be processed by our payment
            providers.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.3</Text>
            Corporate Restructuring: If we are involved in a merger,
            acquisition, transfer or sale of all or a portion of our assets, you
            will be notified via email, account message and/or a prominent
            notice on our website of any change in ownership or uses of this
            Personal Information, as well as any choices you may have regarding
            this Personal Information.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.4</Text>
            Required by law: We may disclose your Personal Information to the
            extent that we are required to do so by law (which may include to
            government bodies and law enforcement agencies); in connection with
            any legal proceedings or prospective legal proceedings; and in order
            to establish, exercise or defend our legal rights (including
            providing information to others for the purposes of fraud
            prevention).
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.5</Text>
            Third party suppliers: we will share your submitted Information with
            third-party suppliers and shippers, for the purposes of running
            checks to seek to prevent money- laundering and other illegal
            activities and to facilate the process of shipping goods purchased
            during livestreams.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.6</Text>
            Access and data portability: You may request that we provide you a
            copy of Personal Information held by us. This information will be
            provided without undue delay subject to a potential fee associated
            with gathering of the information (as permitted by law). In certain
            circumstances, you may request to receive your Personal Information
            in a structured, commonly used and machine-readable format, and to
            have us transmit your Personal Information to another data
            controller.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.7</Text>
            Correction of incomplete or inaccurate personal information: You may
            request that we correct any of your Personal Information held by us
            that is incomplete or inaccurate.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.8</Text>
            Erasure: You may request to erase your Personal Information, subject
            to applicable law.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.9</Text>
            Withdraw consent: To the extent the processing of your Personal
            Information is based on your consent, you may withdraw your consent
            at any time. This withdrawal will not affect the lawfulness of
            NAPA’s processing based on consent before your withdrawal.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.10</Text>
            Restriction of processing: In some jurisdictions, applicable law may
            give you the right to restrict or object to us processing or
            transferring your Personal Information under certain circumstances.
            We may continue to process your Personal Information if it is
            necessary for the defense of legal claims, or for any other
            exceptions permitted by applicable law.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.11</Text>
            Automated individual decision-making, including profiling: NAPA
            relies on automated tools to, for example, help determine whether a
            transaction or a User account presents a fraud or legal risk. In
            some jurisdictions, you have the right not to be subject to a
            decision based solely on automated processing of your Personal
            Information, including profiling, which produces legal effects
            concerning you, or similarly significantly affects you, save for the
            exceptions applicable under relevant data protection laws.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.12</Text>
            Declining to provide information: We may need to collect Personal
            Information in the future. If you do not provide the Personal
            Information we designate as required or mandatory, we may not be
            able to provide our services.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>5.13</Text>
            Make a complaint to a Supervisory Authority: If you are unhappy with
            the way we are processing your Personal Information, please let us
            know by contacting us via the support services.
          </Text>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                6.
              </Text>
              DATA RETENTION
            </Text>

            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              {' '}
              In accordance with data protection laws and good commercial
              practice, we do not retain Personal Information in a form that
              permits identification of the person(s) to whom it relates for any
              longer than is necessary.
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                7.
              </Text>
              SECURITY
            </Text>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              {' '}
              We will take commercially reasonable, appropriate technical and
              organizational measures to ensure a level of security appropriate
              to the risk that could be encountered via the use of our Service,
              taking into account the likelihood and severity those risks might
              pose to your rights and freedoms. In particular, we will take
              precautions to protect against the accidental or unlawful
              destruction, loss or alteration, and unauthorized disclosure of or
              access to the Personal Information transmitted, stored or
              otherwise processed by us. Please be aware that, while we make the
              security of our Service and your Personal Information a high
              priority, no security system can prevent all security breaches.
              Unfortunately, the transmission of information via the internet is
              not completely secure. We do our best to protect your Personal
              Information but we cannot always guarantee the complete security
              of your Personal Information transmitted through our Service;
              subject to applicable law, the sharing of your Personal
              Information with us and any transmission of the data is at your
              own risk.
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                9.
              </Text>
              CALIFORNIA RESIDENTS (CCPA)
            </Text>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              {' '}
              You have the following privacy rights under the CCPA: ● Request to
              Know: You have the right to request to know the following
              information about our practices over the past 12 months: (i) the
              categories of Personal Information we collected about you; (ii)
              the categories of sources from which we collected the Personal
              Information about you; (iii) the categories of third parties with
              which we share Personal Information, (iv) the categories of
              Personal Information we sold or disclosed about you and for each
              category, the categories of third parties to which we sold or
              disclosed that particular category of Personal Information; (v)
              our business or commercial purpose for collecting or selling your
              Personal Information; and (vi) the specific pieces of Personal
              Information we collected about you. You may exercise your right to
              request to know twice a year, free of charge. If we are unable to
              fulfill your request to know, we will let you know the reason why.
              Please note, in response to a request to know, we are prohibited
              from disclosing your Social Security number, driver’s license
              number or other government-issued identification number, financial
              account number, any health insurance or medical identification
              number, an account password, security questions or answers, and
              unique biometric data generated from measurements or technical
              analysis of human characteristics. ● Request to Delete:You have
              the right to request that we delete the Personal Information that
              we have collected from you. We may deny your request under certain
              circumstances, such as if we need to retain your Personal
              Information to comply with our legal obligations or if retaining
              the information is necessary to complete a transaction for which
              your Personal Information was collected. If we deny your request
              to delete, we will let you know the reason why. ● Right to
              Non-Discrimination: If you choose to exercise any of these rights,
              we will not discriminate against you in any way. If you exercise
              certain rights, understand that you may be unable to use or access
              certain features of our Websites. If you would like to make a
              Request to Know or Request to Delete or are an authorized agent of
              a California consumer who would like to make such a request,
              contact us at [privacy@napasociety.io]]. We will take steps to
              verify your identity before processing your request to know or
              request to delete. We will not fulfill your request unless you
              have provided sufficient information for us to reasonably verify
              that you are the individual about whom we collected Personal
              Information. If you have an account with us, we will use our
              existing account authentication practices to verify your identity.
              If you do not have an account with us, we will not require you to
              create an account with us but we may request additional
              information about you so that we can verify your identity. We will
              only use the Personal Information you provide to verify your
              identity and to process your request, unless you initially
              provided the information for another purpose. You may use an
              authorized agent to submit a request to know or a request to
              delete. When we verify your agent’s request, we may verify both
              your and your agent’s identity and request a signed document from
              you that authorizes your agent to make the request on your behalf.
              To protect your Personal Information, we reserve the right to deny
              a request from an agent that does not submit proof that they have
              been authorized by you to act on your behalf. You may also make a
              verifiable consumer request on behalf of your minor child.
              California residents may also request information from us once per
              calendar year about any Personal Information shared with third
              parties for the third party’s own direct marketing purposes,
              including the categories of information and the names and
              addresses of those businesses with which we have shared such
              information. To request this information, please contact us at
              [privacy@napasociety.io]. Your inquiry must specify “Shine the
              Light Request” in the subject line of the email or the first line
              of the letter, and include your name, street address, city, state
              and ZIP code.
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                9.
              </Text>
              YOUR CHOICES
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>9.1</Text>
            Unsubscribe from Email Alerts Should you receive an email alert from
            us, you may unsubscribe from receiving additional email
            communications by following the unsubscribe instructions in the
            emails we send. Additionally you may send us a message requesting to
            unsubscribe by contacting us at [privacy@napasociety.io]]. Please
            note that even if you opt-out of receiving email alerts from us, we
            may continue to send you other email communications.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>9.2</Text>
            Ability to Opt-Out of Tracking Technologies Regular cookies
            generally may be disabled or removed using tools available as part
            of most commercial browsers, and in some instances blocked in the
            future by selecting certain settings. The choices available, and the
            mechanism used, will vary from browser to browser. Such browser
            settings are typically found in the “options,” “tools” or
            “preferences” menu. You may also consult the browser’s “help” menu.
            You can learn more about cookies and how to block cookies on
            different types of browsers by visiting
            http://www.allaboutcookies.org. Also, tools from commercial browsers
            may not be effective with regard to Flash cookies (also known as
            locally shared objects), HTML5 cookies or other tracking
            technologies. For information on disabling Flash cookies, visit
            https://helpx.adobe.com/flashplayer/kb/disable-local-shared-objects-flash.html.
            Please be aware that if you disable or remove these technologies,
            some parts of our Websites may not work and when you revisit our
            Websites, your ability to limit browser-based tracking technologies
            is subject to your browser settings and limitations.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>9.3</Text>
            Ability to Opt-Out of Analytics You may exercise choices regarding
            the use of cookies from Google Analytics by visiting
            https://tools.google.com/dlpage/gaoptout.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>9.4</Text>
            Changes to this Privacy Notice NAPA reserves the right to modify
            this Privacy Notice at any time. Changes will be effective
            immediately upon posting of the revised Privacy Notice, as indicated
            by the “Last Updated” date at the top of this page. We encourage you
            to periodically review this page for the latest information on our
            privacy practices.
          </Text>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                10.
              </Text>
              CONTACT INFORMATION
            </Text>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              {' '}
              All questions, comments or enquiries should be directed to us at
              [privacy@napasociety.io]. We will endeavor to respond to any query
              or questions within a reasonable amount of time.
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 5}}>
          <View style={{paddingVertical: verticalScale(24)}}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                11.
              </Text>
              MISCELLANEOUS
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>11.1</Text>
            Severability If any provision of this Privacy Policy is invalid,
            illegal, or unenforceable, the balance of this Privacy Policy shall
            remain in effect, and if any provision is inapplicable to any person
            or circumstance, it shall nevertheless remain applicable to all
            other persons and circumstances.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>11.2</Text>
            Limitation of Liability NAPA will not be liable for any
            consequential, incidental, punitive, special, exemplary, or indirect
            damages. Lost profits or penalties of any nature are hereby waived;
            these limitations apply without regard to the cause of any liability
            or damage, including the negligence of NAPA. There are no
            third-party beneficiaries to this Agreement.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.descriptionText,
              {paddingVertical: verticalScale(20)},
            ]}>
            <Text style={[{color: themeColors.garyColor}]}>11.3</Text>
            Governing Law and Jurisdiction This Privacy Policy, and any dispute
            or claim (including non-contractual disputes or claims) arising out
            of or in connection with it or its subject matter or formation,
            shall be governed by, and construed in accordance with, the laws of
            Delaware United States of America. You irrevocably agree that the
            courts of [privacy@napasociety.io] shall have exclusive
            jurisdiction to settle any dispute or claim (including
            non-contractual disputes or claims) arising out of or in connection
            with this Privacy Policy or its subject matter or formation.
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  headingText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.xlg,
    alignItems: 'center',
  },
  descriptionText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    textAlign: 'justify',
  },
  accountName: {
    color: themeColors.primaryColor,
    fontSize: size.xlg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
  },
});
