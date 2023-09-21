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
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '../assets/svg';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const TermsConditions = () => {
  const {goBack} = useNavigation<any>();
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
            <Text style={styles.accountName}>Creator Terms & Conditions</Text>}
          width={'90%'}
          rightChildrenWidth={'0%'}
          leftChildrenWidth = {'10%'}
        />
      <ScrollView>
        <View style={{marginHorizontal: moderateScale(24), marginTop: 5}}>
          <View style={{paddingTop: verticalScale(10)}}>
            <Text style={styles.headingText}>
              <Text
                style={[
                  styles.headingText,
                  {color: themeColors.garyColor},
                ]}></Text>
              EACH PERSON WHO SELLS, PURCHASES OR OTHERWISE POSSESSES A
              COLLECTIBLE (AS DEFINED HEREIN) UNDER CIRCUMSTANCES INDICATING
              THAT SUCH COLLECTIBLE IS SUBJECT TO THIS FORM OF LICENCE, THEREBY,
              WITHOUT FURTHER ACTION, AGREES TO BE BOUND BY THE TERMS OF THIS
              NAPA STANDARD COLLECTIBLES SALE AND LICENCE AGREEMENT. These
              Creator Terms (the "Terms") sets forth the terms and conditions
              governing each Collectible lawfully offered, sold or transferred
              under circumstances indicating to a reasonable person that the
              bona fide creator, offeror or seller of such Collectible (the
              "Creator") intends that the Collectible or the offer, sale, use,
              or transfer of the Collectible shall be governed hereby. Without
              limiting the generality of the foregoing, any Collectible shall be
              governed by these Terms if the Collectible Metadata includes a
              copy of these Terms, a reasonably verifiable cryptographic hash of
              these Terms, or a statement that the Collectible (including
              identification of the relevant variant and version number) shall
              be governed by these Terms. The NFT Marketplace Terms of Service
              and Terms of Use for Social Media Platform are incorporated herein
              by reference, and shall be read as a part and parcel of these
              Terms.
            </Text>
          </View>
          <View style={{marginHorizontal: moderateScale(24), marginTop: 5}}>
            <View style={{paddingTop: verticalScale(10)}}>
              <Text style={styles.headingText}>
                <Text
                  style={[styles.headingText, {color: themeColors.garyColor}]}>
                  1.
                </Text>
                Collectibles
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              <Text style={[{color: themeColors.garyColor}]}>1.1</Text>
              "Collectible" means the combination of: (A) an Ethereum-based NFT
              having a Uniform Resource Identifier (" URI") identifying an
              appropriately configured JSON file conforming to the ERC-721
              Metadata JSON Schema, ERC-1155 Metadata URI JSON Schema or a
              similar JSON schema, as applicable (such JSON file, the "
              Collectible ID"); and (B) the Collectible Metadata specified by
              such Collectible ID.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}> 1.2</Text> The
              Collectible ID of a Collectible specifies the properties of the
              Collectible, including the name and description of the Collectible
              (the " Collectible Descriptors"), a URI identifying a file storing
              a photograph, illustration,image,vector, video,3Dasset,template
              asset, or other pictorial or graphic work associated with the
              Collectible (the " Collectible Image") and potentially other
              metadata associated with the Collectible (the Collectible
              Descriptors, Collectible Image and such other metadata,
              collectively, the " Collectible Metadata").
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}> 1.3</Text>{' '}
              "Collector" of a Collectible means at each time, the person who
              lawfully holds exclusive title to and ownership of the NFT
              included in such Collectible, for so long as such person continues
              to hold such title to and ownership of such NFT. All references to
              "Collector" include the Collector's lawful permitted successors
              and assigns. In the event of an Ethereum Persistent Fork creating
              copies of the Collectibles at the same addresses at which they
              were then held on Ethereum, the scope of the term "Collector," and
              all licences granted to and other rights of a Collector under
              these Terms, shall be deemed expanded to include each person who
              lawfully holds exclusive title to and ownership of the copies of
              such NFTs that are included on the Ethereum Persistent Fork. The
              parties acknowledge and agree that, as a result of the preceding
              sentence, in an Ethereum Persistent Fork, the aggregate number of
              the Collectibles may be increased, which could have an adverse
              effect on the value of each Collectible or the aggregate value of
              the total Collectibles.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}> 1.4</Text>{' '}
              "Ethereum" means the Ethereum mainnet and the consensus blockchain
              for such mainnet (networkID:0, chainID:0) as recognized by the
              official Go Ethereum Client, or, if applicable, the network and
              blockchain generally recognized as the legitimate successor
              thereto.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}> 1.5</Text>{' '}
              "Ethereum Persistent Fork" means an Ethereum network and
              blockchain generally recognized in the blockchain industry as the
              mainnet and consensus blockchain of a persistent "contentious
              hardfork" from Ethereum, provided that such hardfork has or would
              reasonably be expected to have material value independent from
              Ethereum.{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}> 1.5</Text> "NFTs"
              means any Ethereum-based tokens complying with the ERC-721
              standard, ERC-1155 standard or other similar non-fungible token
              standard.
            </Text>
          </View>
          <View
            style={{
              paddingVertical: verticalScale(20),
              paddingTop: verticalScale(40),
            }}>
            <Text style={styles.headingText}>
              <Text
                style={[styles.headingText, {color: themeColors.garyColor}]}>
                2.
              </Text>
              Ownership
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.descriptionText]}>
                <Text style={[{color: themeColors.garyColor}]}>2.1. </Text> The
                Creator hereby represents and warrants, to and for the benefit
                of the Collector and each Sublicensee that: (a) the Collectible
                Image is an original work of authorship by the Creator or an
                original work of authorship by a person from whom Creator has a
                valid and enforceable licence permitting the Creator to licence
                the Collectible Image to others upon the terms and subject to
                the conditions of these Terms; (b) the Collector's ownership of
                the NFT and use of the Collectible Image and Collectible in
                accordance with these Terms will be free and clear of all
                additional claims, encumbrances, liens and security interests of
                any kind; and (c) the Collectible Image and the Collectible do
                not infringe, misappropriate or otherwise violate any
                intellectual property or other right of any third party. If the
                Collectible Image is licensed to the Creator, then: (x) Creator
                hereby represents and warrants that it is acting on behalf of,
                and with all necessary and desirable authorization from, the
                licensors; and (y) to the extent permitted by law, all other
                references to the "Creator" in these Terms shall be deemed to
                include such licensors, including, without limitation for
                purposes of every grant of rights made by 'the Creator'
                hereunder. Except as expressly granted in these Terms,the
                Creator retains all rights, title, and interest in and to the
                Collectible Images.
              </Text>
            </View>
            <View
              style={{
                paddingVertical: verticalScale(20),
                paddingTop: verticalScale(40),
              }}>
              <Text style={styles.headingText}>
                <Text
                  style={[styles.headingText, {color: themeColors.garyColor}]}>
                  3.
                </Text>
                Licence Terms and Specific Restrictions Applicable to
                Collectible Images.
              </Text>
            </View>
            <Text
              style={[
                styles.descriptionText,
                {paddingVertical: verticalScale(20)},
              ]}>
              <Text style={[{color: themeColors.garyColor}]}></Text> Licence to
              Collectible Image. For the promises received and given and other
              good and valuable consideration, including the purchase price, if
              any, paid for the Collectible, the sufficiency of which is hereby
              acknowledged, the Creator hereby grants to each Collector a
              licence to the Collectible Image, upon the following terms and
              conditions and the other terms and conditions of these Terms:
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}>3.1</Text> The
              licence is perpetual, fully paid up and worldwide.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}>3.2</Text> The
              licence is exclusive to the Collectors and Sublicensees, on the
              terms set forth in Section 3 hereof.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}>3.3</Text> The
              Collector may make personal and non-commercial use of the
              Collectible Image, solely as part of the Collectible (the
              "Personal Use Right" ). Non-commercial uses are uses that are not
              promotional, advertorial or involved in merchandising or otherwise
              commercial.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}>3.4</Text> The
              Collector may sell, transfer, or assign all (but not less than
              all) of its right, title, and interest in and to the NFT
              associated with the Collectible (a "Resale"), and upon such
              Resale, all of the Collector's rights and interests in and to the
              Collectible, including all of the Collector's rights and interests
              in and to the Collectible Image, will be considered sold,
              transferred, or assigned, as the case may be, to the buyer,
              transferee, or assignee of such NFT along with the NFT itself (the
              "Resale Right"). The Collector's rights, title and interest in the
              Collectible may not be assigned, sold or transferred, in whole or
              in part, to any person and the Resale Right may not be exercised,
              in whole or in part, without a sale and transfer of the NFT
              associated with the Collectible to the assignee, purchaser or
              transferee, as applicable.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.descriptionText]}>
              <Text style={[{color: themeColors.garyColor}]}>3.5</Text> The
              Collector may sublicense the Collector's Personal Use Rights in
              the Collectible Image to the lawful operators of websites, the
              user interfaces of software applications, virtual museums or
              virtual galleries, or physical museums or physical galleries (if
              such physical museum or physical gallery solely displays the
              Collectible Image on a screen while the NFT is held in escrow for
              such purpose) ("Sublicensees"), in each case, for the purposes of:
              (A) displaying the Collectible Image as part of the Collectible to
              the public for educational, non-commercial or cultural purposes
              without any compensation being paid to the Collector; or (B)
              displaying the Collectible in connection with sale, trading or
              transfer transactions in the Collectible in accordance with the
              Resale Right. In each case, the relevant Sublicensee must display
              the Collectible Image under circumstances reasonably intended to
              highlight the association of the Collectible Image with the NFT as
              part of the Collectible. Notwithstanding the otherwise personal
              and non-commercial nature of the Personal Use Right and the
              restrictions set forth in Section 7, the use of the Collectible
              Image by a Sublicensee consistent with the uses stated in this
              paragraph may have a commercial purpose for the Sublicensee
              pursuant to its general business of displaying and facilitating
              trading in images and other information regarding NFT-based art
              collectibles, promoting such business and collecting fees or
              commissions in connection with such business.
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingVertical: verticalScale(20),
            paddingTop: verticalScale(40),
          }}>
          <Text style={styles.headingText}>
            <Text style={[styles.headingText, {color: themeColors.garyColor}]}>
              4.
            </Text>
            NAPA and Other Sublicensees.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}>4.1</Text> NAPA Inc.,
            a Delaware corporation (" NAPA"), is hereby automatically deemed to
            be a Sublicensee of Collector. Any transaction made by the Collector
            through or with the assistance of any application or software tool
            of a person eligible to be a Sublicensee and that involves the
            Collectibles shall automatically be deemed to create an irrevocable,
            perpetual sublicense of the Collectible Image to such person, and
            such person shall be deemed to be a Sublicensee. Each Sublicensee
            shall be an intended third-party beneficiary of these Terms.
          </Text>
        </View>
        <View
          style={{
            paddingVertical: verticalScale(20),
            paddingTop: verticalScale(40),
          }}>
          <Text style={styles.headingText}>
            <Text style={[styles.headingText, {color: themeColors.garyColor}]}>
              5.
            </Text>
            Subrogation.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}>5.1</Text> To the
            maximum extent permitted by applicable law, each Sublicensee shall
            be subrogated to, and entitled to enforce, seek and receive (but
            shall have no obligation to enforce, seek or receive): (a) all of
            the Creator's rights and remedies against the Collector or any third
            party to pursue causes of action for copyright or other intellectual
            property rights infringement relating to the Collectible or pursuant
            to any provision of these Terms; and (b) all of the Collector's
            rights and remedies against the Creator pursuant to any provision of
            these Terms. To the maximum extent permitted by applicable law, each
            Collector shall be subrogated to, and entitled to enforce, seek and
            receive (but shall have no obligation to enforce, seek or receive)
            all of the Creator's rights and remedies against any third party to
            pursue causes of action for copyright or other intellectual property
            rights infringement relating to the Collectible or pursuant to any
            provision of these Terms. The Creator hereby covenants and agrees to
            assist each Sublicensee and each Collector with enforcing the rights
            of the Creator to which the Sublicensee and Creator are subrogated
            under this Section, including, without limitation, by joining as a
            plaintiff in any legal action necessary or desirable for the
            enforcement of such rights.
          </Text>
        </View>
        <View
          style={{
            paddingVertical: verticalScale(20),
            paddingTop: verticalScale(40),
          }}>
          <Text style={styles.headingText}>
            <Text style={[styles.headingText, {color: themeColors.garyColor}]}>
              6.
            </Text>
            Exclusivity.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}>6.1</Text> The
            Creator represents and warrants that it has not licensed, and
            covenants that it will not licence, any rights to the Collectible
            Image except upon these Terms to the lawful possessor of the NFT
            associated with the Collectible. Notwithstanding the immediately
            preceding sentence, if the Collectible was originally offered, sold
            or transferred by or on behalf of the Creator under circumstances
            reasonably indicating that the Collectible Image will be included in
            each of a series of Collectibles associated with a series of NFTs
            which comply with the ERC-1155 standard (or a similar standard for
            creating NFTs series), then the Creator represents and warrants that
            it has not licensed, and covenants that it will not license, any
            rights to the Collectible Image except upon these Terms to the
            lawful possessors of the Collectibles (including the associated
            NFTs) within such series.
          </Text>
        </View>
        <View
          style={{
            paddingVertical: verticalScale(20),
            paddingTop: verticalScale(40),
          }}>
          <Text style={styles.headingText}>
            <Text style={[styles.headingText, {color: themeColors.garyColor}]}>
              7.
            </Text>
            Restrictions - Each Collector will not, and agrees not to cause or
            allow any other person to:
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}></Text> incorporate a
            Collectible Image into merchandise intended for sale or
            distribution;
            {'\n'}
            use,include,or incorporate the Collectible Image in any electronic
            template or design template application (e.g., a meme template or
            meme generator template, a web design or presentation template, or
            templates for electronic greeting cards or business cards);
            {'\n'}
            use the Collectible Images in any way that exceeds the scope of the
            license to the Collectible Images;
            {'\n'}
            use the Collectible Images with material that violates any
            third-party rights, or otherwise take any action in connection with
            the Collectible Images that infringes the intellectual property or
            other rights of any person or entity, such as the moral rights of
            the creator of the Collectible Images or the rights of any person
            who, or any person whose property, appears in or is associated with
            the Collectible Images;
            {'\n'}
            register, or apply to register, or otherwise claim rights in, a
            trademark, design mark, service mark, sound mark, or tradename, that
            uses any Collectible Image (in whole or in part); or claim ownership
            rights in an attempt to prevent any third party from using a
            Collectible Image;
            {'\n'}
            use the Collectible Images in a manner that is pornographic or
            defamatory, or that violates any applicable community standards,
            laws, rules, or regulations;
            {'\n'}
            use the Collectible Images in a manner, or in connection with a
            subject, that a reasonable person could consider unflattering,
            immoral, offensive, obscene, or controversial, taking into account
            the nature of the Collectible Image, examples of which could include
            ads for tobacco; adult entertainment clubs or similar venues or
            services; implied or stated endorsements of political parties or
            other opinion-based movements; or implying mental or physical
            impairment;
            {'\n'}
            use the Collectible Images in an editorial manner without the
            accompanying credit line or attribution, placed in a way that is
            reasonable to the applicable use;
            {'\n'}
            use the Collectible Images contrary to any additional restrictions
            included in the Collectible Metadata;
            {'\n'}
            remove, obscure or alter any proprietary notices associated with the
            Collectible Images, or give any express or implied misrepresentation
            that the Collector or another third party are the creator or holder
            of Intellectual Property Rights in any Collectible Images;
            {'\n'}
            use the Collectible Images other than for the benefit of the
            Collector;
            {'\n'}
            use or exploit the Collectible Images in any manner other than as
            expressly provided in these Terms;
            {'\n'}
            use the Collectible Images for any commercial purpose other than as
            expressly provided in these Terms; or
            {'\n'}
            modify the Collectible Images.
            {'\n'}
            For the avoidance of doubt, in order to use Collectible Images for a
            commercial purpose, the Collector must first: (1) obtain a licence
            directly from the Creator; and (2) secure additional permissions as
            necessary. The Creator (and other intellectual property owners of
            the Collectible Image, if any) shall be under no obligation to grant
            or negotiate or offer such additional licence.
          </Text>
        </View>

        <View
          style={{
            paddingVertical: verticalScale(20),
            paddingTop: verticalScale(40),
          }}>
          <Text style={styles.headingText}>
            <Text style={[styles.headingText, {color: themeColors.garyColor}]}>
              8.
            </Text>
            EIndemnification Obligations.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}>8.1</Text> Without
            limiting the other obligations in these Terms, Collector agrees to
            indemnify, hold harmless, compensate and reimburse the Creator, each
            Sublicensee and their respective Sublicensee and their respective
            subsidiaries, affiliates, officers, agents, employees, partners, and
            licensors from or for any claim, demand, loss, or damages, including
            reasonable attorneys' fees, arising out of or related to Collector's
            use of the Collectible Images or Collector's violation of these
            Terms.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.descriptionText]}>
            <Text style={[{color: themeColors.garyColor}]}>8.2</Text> Without
            limiting the other obligations in these Terms, Creator agrees to
            indemnify, hold harmless, compensate and reimburse the Collector,
            each Sublicensee and their respective Sublicensee and their
            respective subsidiaries, affiliates, officers, agents, employees,
            partners, and licensors from or for any claim, demand, loss, or
            damages, including reasonable attorneys' fees, arising out of or
            related to any breach or inaccuracy in the Creator's representations
            and warranties in these Terms or any violation of these Terms by
            Creator. Injunctive Relief.{'\n'}
            Notwithstanding anything else in these Terms, Collector hereby
            agrees that, in the event of Collector's or any third party's
            unauthorized access to, or use of, the Collectible Images in
            violation of these Terms, the Creator and any affected Sublicensee
            shall be entitled to apply for injunctive remedies (or an equivalent
            type of urgent legal relief) in any jurisdiction, without providing
            notice or opportunity to cure.
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
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
    fontSize: size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
  },
});
