import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Loading from 'shared/components/Loading';
import { getPageLoading } from '../reducer';

const PageContainer = styled.div``;

const TermsAndConditions = () => {
  const isLoading = useSelector(getPageLoading);

  return isLoading ? (
    <Loading />
  ) : (
    <PageContainer className="terms-and-conditions">
      <h1>TERMS AND CONDITIONS</h1>
      <div>
        This website is operated by XCourt, Inc. d/b/a Crosscourt, a Delaware corporation (“
        Crosscourt ”, “ we ”, “ us ”, or “ our ”). These Terms and Conditions (these “ Terms ”)
        govern your relationship with Crosscourt, including, but not limited to, your use of
        www.cross-court.com (the “ Website ”) and the Crosscourt Mobile Application (the “ App ”),
        your registration, purchase and right to cancel Sessions (as defined below), your
        participation in the Activities (as defined below), your use of the Facilities (as defined
        below), and your communication with Crosscourt.
        <br />
        <br />
        <span className="term">A. Must Be 18 Years Old</span>
        <br />
        <br />
        You must be at least 18 years old (i) to use the Website and App and (ii) to sign up,
        purchase and/or participate in any Session. Crosscourt does not accept the registration of
        minors and has the right to refuse the Sessions to any person who has signed up and/or
        purchased a Session and is later revealed to be a minor.
        <br />
        <br />
        <span className="term">B. Crosscourt Sessions</span>
        <br />
        <br />
        Crosscourt hosts a one-hour, high intensity, team sport based fitness experience (“ Sessions
        ”) that is made available for registration through the Website and App. You may participate
        in a Session only if you had purchased and signed up for such Session prior to the start
        time thereof. You may register for Sessions through the Website or App by purchasing a
        Series or using your “First Session Free discount”. The First Session Free Discount is
        specific to a particular place, date and time (as indicated in the description of the
        Session), after which the Session will have expired. Series have no set expiration date and
        can be used to reserve any Session available on the Website or App until all purchased
        Sessions have been used. Once you purchase a Series and reserve a particular Session using
        one of your purchases, the date, time and place of your scheduled Session is referred to
        herein as a “ Reservation ”.
        <br />
        <br />
        Session prices are subject to change in our sole discretion. We accept MasterCard, Visa,
        Discover, and American Express. Your credit card will be charged when you purchase a Series
        through the App or Website. Crosscourt will not process charges that use an incorrect,
        expired, or over-the-limit credit card. We will try to contact you if this occurs.
        <br />
        <br />
        <span className="term">C. Cancellation Policy for Reservations</span>
        <br />
        <br />
        In order to cancel a Reservation and return your purchased Session to your account, you must
        cancel your Reservation at least 5 hours prior to the start time of such Reservation. Once
        your Reservation is cancelled, your purchased Session will be returned to your account to be
        used at a future date. If you
        <br />
        <br />
        haven’t cancelled by the deadline listed above, your Session will have been used for the
        Reservation and will no longer be shown in your account.
        <br />
        <br />
        <span className="term">
          D. Items to NotePlease note, in fairness to all Session participants, WE DO NOT GUARANTEE
          THE ABILITY TO WARM UP/SHOOT AROUND PRIOR TO THE SESSION.
        </span>
        <br />
        <br />
        If you are running late to a Reservation, we ask that you message the Session Experience
        Manager or Session Official to let us know you are on the way.
        <br />
        <br />
        If you’re planning on leaving earlier than the scheduled end time of your Reservation, we
        kindly request that you message the Session Experience Manager ahead of time.
        <br />
        <br />
        <span className="term">E. ASSUMPTION OF RISK</span>
        <br />
        <br />
        YOU ACKNOWLEDGE AND UNDERSTAND THAT YOU WILL BE VOLUNTARILY SIGNING UP FOR, PARTICIPATING IN
        AND/OR ATTENDING SESSIONS (THE “ ACTIVITIES ”) AND USING THE PREMISES, FACILITIES AND
        EQUIPMENT ASSOCIATED THEREWITH (THE “ FACILITIES ”), WHICH INVOLVE INHERENT RISKS THAT
        CANNOT BE ELIMINATED REGARDLESS OF THE CARE TAKEN TO AVOID SUCH RISKS, INCLUDING, BUT NOT
        LIMITED TO, RISKS OF SCRATCHES, CUTS, BRUISES, SPRAINS, EYE INJURY, LOSS OF SIGHT, JOINT OR
        BACK INJURIES, TORN MUSCLES, LIGAMENTS OR TENDONS, BONE FRACTURES, HEART ATTACKS,
        RHABDOMYOLYSIS, CONCUSSIONS, PARALYSIS AND DEATH, DUE NOT ONLY TO MY OWN ACTIONS, INACTION
        OR NEGLIGENCE, BUT ALSO TO THE ACTION, INACTION OR NEGLIGENCE OF OTHERS, OR CONDITIONS OF
        THE FACILITIES USED IN CONNECTION WITH THE ACTIVITIES. YOU ACKNOWLEDGE THAT YOU ARE
        KNOWINGLY AND VOLUNTARILY PARTICIPATING IN THE ACTIVITIES AND USING THE FACILITIES WITH AN
        EXPRESS UNDERSTANDING OF THE DANGER INVOLVED AND HEREBY AGREE TO ACCEPT AND ASSUME ANY AND
        ALL SUCH RISKS, WHETHER CAUSED BY THE ORDINARY NEGLIGENCE OF CROSSCOURT OR OTHERWISE.
        <br />
        <br />
        <span className="term">F. Compliance with Safety Instructions and Rules</span>
        <br />
        <br />
        You have read and thoroughly understand the Safety Instructions and Rules that are posted on
        the Website. At all times, you shall comply with the Safety Instructions and Rules and all
        rules and verbal instructions given to you by the Crosscourt staff. You agree and understand
        that the Crosscourt staff reserves the right to refuse entry, suspend or cancel the
        Activities for any participant that fails to follow the Safety Instructions and Rules and
        other directives of the Crosscourt staff.
        <br />
        <br />
        <span className="term">G. Ability to Participate in Activities</span>
        <br />
        <br />
        You hereby acknowledge (i) that you are physically, emotionally and mentally able to
        participate in the Activities and use the Facilities; and (ii) that you know of no medical
        reason why you should not participate in the Activities and use the Facilities. You will
        immediately remove yourself from participation in the Activities and use of the Facilities,
        and notify the nearest Crosscourt staff member, if at any time you sense or observe any
        unusual hazard or unsafe condition, or if you feel that you have experienced any
        deterioration in your physical, emotional or mental fitness for continued participation in
        the Activities or use of the Facilities. If in the subjective opinion of the Crosscourt
        staff you would be at physical risk participating in the Activities and using the
        Facilities, you agree and understand that the Crosscourt staff reserves the right to refuse
        entry, suspend or cancel the Activities for any such participant.
        <br />
        <br />
        <span className="term">H. Waiver and Release</span>
        <br />
        <br />
        You hereby (1) agree to assume full responsibility for any and all injuries or damage which
        are sustained or aggravated by you in relation to your participation in the Activities and
        your use of the Facilities, whether sustained while playing or not, and (2) irrevocably
        waive and release any and all actions, claims, or demands that you, your spouse, assigns,
        heirs, next of kin, guardians, and legal representatives (the “ Releasing Parties” ) may
        have or may hereafter have, whether known or unknown, including, without limitation, for
        damage or losses on account of injury, permanent disability and death or damage to property
        (collectively, “ Activity Claims ”) against Crosscourt, and its direct and indirect parent
        and subsidiary affiliate entities, and each of their respective officers, directors,
        shareholders, employees, representatives and agents, and each of their respective successors
        and assigns (the “ Released Parties” ), caused or alleged to be caused in whole or in part
        by the ordinary negligence or other acts of any of the Released Parties arising out of or
        attributable to your participation in the Activities or use of the Facilities. You, for
        yourself and on behalf of the Releasing Parties, covenant not to make or bring any such
        Activity Claim against any Released Party, and forever release and discharge the Released
        Parties from liability under such Activity Claims.
        <br />
        <br />
        <span className="term">I. Permission to Use Name and Likeness.</span>
        <br />
        <br />
        You hereby irrevocably permit, authorize, grant, and license Crosscourt the rights to
        display, publicly perform, exhibit, transmit, broadcast, reproduce, record, photograph,
        digitize, modify, alter, edit, adapt, create derivative works, exploit, sell, rent, license,
        otherwise use, and permit others to use, your name, image, likeness and sound of your voice
        in connection with your participation in the Activities and use of the Facilities for the
        purpose of promoting Crosscourt and the Sessions in perpetuity throughout the universe in
        any medium or format whatsoever now existing or hereafter created without payment or any
        other consideration. You understand that your name, image, likeness and sound of your voice
        may be videotaped, edited, copied, exhibited, published or distributed and waive the right
        to inspect or approve the finished product wherein your name, image, likeness or sound of
        your voice appears. Additionally, you waive any right to royalties or other compensation
        arising or related to the use of your name, image, likeness and sound of your voice as set
        forth herein.
        <br />
        <br />
        <span className="term">J. Waiver and Release for Use of Name and Likeness.</span>
        <br />
        <br />
        You, for yourself and on behalf of the Releasing Parties, hereby irrevocably waive and
        release all actions, claims, or demands that you or any Releasing Party may have or may
        hereafter have, whether known or unknown, including, without limitation, claims for
        copyright or trademark infringement, infringement of moral rights, libel, defamation,
        invasion of any rights of privacy (including intrusion, false light, public disclosure of
        private facts, and misappropriation of name or likeness), violation of rights of publicity,
        physical or emotional injury or distress, or any similar claim or cause of action in tort,
        contract, or any other legal theory (collectively, “ Name and Likeness Claims ”, and
        together with Activity Claims, the “ Released Claims ”) against the Released Parties arising
        out of or attributable to Crosscourt’s exercise of its rights under Section J . You, for
        yourself and on behalf of the Releasing Parties, covenant not to make or bring any such Name
        and Likeness Claim against any Released Party, and forever release and discharge the
        Released Parties from liability under such Name and Likeness Claims.
        <br />
        <br />
        <span className="term">K. Waiver of California Civil Code Section 1542.</span>
        <br />
        <br />
        You, on behalf of yourself and on behalf of the Releasing Parties, understand and agree that
        the releases set forth in Sections I and K shall include a release of all Released Claims
        under Section 1542 of the Civil Code of the State of California (“ Section 1542 ”), which
        shall be expressly waived by you on behalf of yourself and the Releasing Parties. Section
        1542 reads as follows: “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS THAT THE CREDITOR OR
        RELEASING PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF
        EXECUTING THE RELEASE AND THAT, IF KNOWN BY HIM OR HER, WOULD HAVE MATERIALLY AFFECTED HIS
        OR HER SETTLEMENT WITH THE DEBTOR OR RELEASED PARTY.” Notwithstanding Section 1542, and for
        the purpose of implementing a full and complete release and discharge of the Released
        Claims, you, for yourself and on behalf of the Releasing Parties, expressly acknowledge that
        the releases set forth in Sections I and K shall be intended to include, and shall include
        in its effect, without limitation, all Released Claims which the Releasing Parties do not
        know or suspect to exist in their favor against the Released Parties at the time of
        execution hereof, and that the foregoing release expressly contemplates the extinguishment
        of all such Released Claims.
        <br />
        <br />
        <span className="term">L. Links/Third Party Websites</span>
        <br />
        <br />
        Crosscourt has not reviewed all the sites linked to the Website and/or App, and is not
        responsible for the content or any off-site pages or other linked sites. Although a third
        party website and/or app may contain the Crosscourt logos, please understand that it is
        independent from Crosscourt, and that Crosscourt has no control over the content of that
        website and/or app. Going to third party or off-site websites from the Website and/or App is
        at your own risk. These links do not imply endorsement of, sponsorship of, or affiliation
        with Crosscourt.
        <br />
        <br />
        <span className="term">M. Texts and Calls</span>
        <br />
        <br />
        We may offer you the ability to receive texts, push notifications, and calls in connection
        with our services. If you opt-in to receive texts, SMS push notifications, and calls, you
        agree that Crosscourt may send you recurring texts and calls (including prerecorded and/or
        by autodialer) to the phone number you provide for transactional, communicative, and
        marketing purposes in accordance with the terms of your opt-in. You can opt-out of receiving
        texts or calls to your phone number at any time by contacting us at ccteam@cross-court.com
        and specifying you want to opt-out of texts to your phone number; and (ii) for calls,
        requesting opt-out during any call you receive from us or contacting us as at
        ccteam@cross-court.com and specifying you want to opt-out of calls to your phone number. You
        understand that your consent is not required as a condition of purchase. Standard message,
        data, and other fees may be charged by your carrier, and carriers may deduct charges from
        pre-paid amounts or data allowances, for which you are responsible. Not all phones and/or
        carriers are supported. Contact your carrier for further details. Additional terms may apply
        as set out in the terms of your opt-in.
        <br />
        <br />
        <span className="term">N. Intellectual Property Rights</span>
        <br />
        <br />
        The trademarks and trade dress of Crosscourt are proprietary to Crosscourt and may not be
        used by you for any reasons other than as expressly permitted by these Terms. All Website
        and App content, design, text, graphics, and interfaces; the collection, selection, and
        arrangement thereof; and all software are property of, or duly licensed to, Crosscourt. You
        have the right to view, electronically copy, and print in hard copy portions of the Website
        and App for the sole purpose of making purchases and signing up for Sessions, making
        Reservations, participating in the Activities, using the Facilities and otherwise complying
        with these Terms.
        <br />
        <br />
        Any other use of materials on the Website, including modification, distribution, or
        reproduction for purposes other than those noted above, without the prior written permission
        of Crosscourt, is strictly prohibited.
        <br />
        <br />
        You acknowledge that Crosscourt and/or third party content providers remain the owners of
        all Website and App materials, and that you do not acquire any of those ownership rights by
        downloading, copying, or using any such material in accordance with these Terms. Crosscourt
        may discontinue or remove the Website or App, or any portion thereof, or discontinue your
        right to use the Website or App, or any portion thereof, at any time.
        <br />
        <br />
        <span className="term">O. Not Authorized to Perform Data Mining</span>
        <br />
        <br />
        You are not authorized without the prior written permission of Crosscourt to use any
        computer code, data mining software, “robot”, “bot”, “spider”, “scraper” or other automatic
        device, or program, algorithm or methodology having similar processes or functionality, or
        any manual process, to monitor or copy any of the web pages, data or content found on the
        Website and/or App or accessed through the Website and/or App. You also may not engage in
        the mass downloading of files from the Website and/or App; use the computer processing power
        of the Website and/or App for purposes other than those permitted above; flood this site
        with electronic traffic designed to slow or stop its operation; or establish links to or
        from other websites to the Website.
        <br />
        <br />
        <span className="term">P. Not Authorized to Use the Website for Commercial Purposes</span>
        <br />
        <br />
        Users are not authorized to sell, reproduce, distribute, modify, display, publicly perform,
        report or otherwise prepare derivative or second hand works based on any of Crosscourt’s
        material in any way for any public or commercial purpose. Thus, you are not authorized to
        (i) resell or make commercial use of this site or its contents; (ii) collect or use any
        product listings, descriptions, photographs or prices displayed on the Website and/or App in
        connection with the sale or resale of any Crosscourt products or for other commercial
        purposes; or (iii) create, reproduce and/or distribute any materials derived from the
        content provided on the Website and/or App. Furthermore, Crosscourt’s material may not be
        displayed or communicated on any other website and/or app, in a networked computer
        environment or other digital support for any purpose whatsoever. In the event of breach of
        any of these Terms, user's permission to use Crosscourt’s material will automatically
        terminate and any copies made of Crosscourt’s material must be immediately destroyed.
        <br />
        <br />
        Any unauthorized use of Crosscourt’s material may violate state and federal criminal laws,
        infringe copyright laws, trademark laws, the laws of privacy or publicity, and communication
        regulations and statutes.
        <br />
        <br />
        <span className="term">Q. WARRANTY DISCLAIMER AND LIMITATION OF LIABILITY</span>
        <br />
        <br />
        IN NO EVENT WILL CROSSCOURT OR ANY OF THE RELEASED PARTIES BE LIABLE UNDER THESE TERMS TO
        YOU OR ANY THIRD PARTY FOR ANY CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
        PUNITIVE, OR ENHANCED DAMAGES, LOST PROFITS OR REVENUES OR DIMINUTION IN VALUE, ARISING OUT
        OF, OR RELATING TO, AND/OR IN CONNECTION WITH THE WEBSITE, APP, SESSIONS, RESERVATION,
        ACTIVITIES, FACILITIES OR ANY BREACH OF THESE TERMS, REGARDLESS OF (A) WHETHER SUCH DAMAGES
        WERE FORESEEABLE, (B) WHETHER OR NOT ANY RELEASED PARTY WAS ADVISED OF THE POSSIBILITY OF
        SUCH DAMAGES AND (C) THE LEGAL OR EQUITABLE THEORY (CONTRACT, TORT, OR OTHERWISE) UPON WHICH
        THE CLAIM IS BASED.
        <br />
        <br />
        ALL INFORMATION, GOODS, SERVICES, PRODUCTS AND EXPERIENCES ARE PROVIDED BY CROSSCOURT ON AN
        “AS IS” BASIS ONLY. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE GOODS,
        SERVICES, PRODUCTS AND EXPERIENCES REMAINS WITH YOU. SHOULD THE GOODS, SERVICES, PRODUCTS
        AND/OR EXPERIENCES PROVE DEFECTIVE AFTER PURCHASE, YOU ASSUME THE ENTIRE COST OF SUCH
        DEFECT. CROSSCOURT PROVIDES NO REPRESENTATIONS AND WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
        THE IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, AND
        NON-INFRINGEMENT.
        <br />
        <br />
        <span className="term">R. COVID-19 Liabilities Disclaimer</span>
        <br />
        <br />
        The novel coronavirus, COVID-19, has been declared a worldwide pandemic by the World Health
        Organization. COVID-19 is extremely contagious and is believed to spread mainly from
        person-to-person contact. As a result, federal, state, and local governments and federal and
        state health agencies recommend social distancing and have, in many locations, prohibited
        the congregation of groups of people. Crosscourt cannot guarantee that you will not become
        infected with COVID-19. Because the Facilities and Sessions are open for use by other
        individuals, you recognize that you are at higher risk of contracting COVID-19.
        <br />
        <br />
        By participating in Sessions and attending Facilities, you acknowledge the contagious nature
        of COVID-19 and voluntarily assume the risk that you may be exposed to or infected by
        COVID-19 and that such exposure or infection may result in personal injury, illness,
        permanent disability, and death. You understand that the risk of becoming exposed to or
        infected by COVID-19 may result from the actions, omissions, or negligence of yourself and
        others, including, but not limited to, Crosscourt employees, representatives, contractors
        and agents.
        <br />
        <br />
        BY PARTICIPATING IN SESSIONS AND ATTENDING FACILITIES, YOU VOLUNTARILY AGREE TO ASSUME ALL
        OF THE FOREGOING RISKS AND ACCEPT SOLE RESPONSIBILITY FOR ANY INJURY TO YOURSELF (INCLUDING,
        BUT NOT LIMITED TO, PERSONAL INJURY, DISABILITY, AND DEATH), ILLNESS, DAMAGE, LOSS, CLAIM,
        LIABILITY, OR EXPENSE, OF ANY KIND, THAT YOU MAY EXPERIENCE OR INCUR IN CONNECTION WITH YOUR
        PARTICIPATION IN SESSIONS AND/OR ATTENDANCE AT FACILITIES (“CLAIMS”). YOU HEREBY RELEASE,
        COVENANT NOT TO SUE, DISCHARGE, AND HOLD HARMLESS CROSSCOURT, ITS EMPLOYEES, DIRECTORS,
        SHAREHOLDERS, OFFICERS, AGENTS, AND REPRESENTATIVES, OF AND FROM THE CLAIMS, INCLUDING ALL
        LIABILITIES, CLAIMS, ACTIONS, DAMAGES, COSTS OR EXPENSES OF ANY KIND ARISING OUT OF OR
        RELATING THERETO. I UNDERSTAND AND AGREE THAT THIS RELEASE INCLUDES ANY CLAIMS BASED ON THE
        ACTIONS, OMISSIONS, OR NEGLIGENCE OF CROSSCOURT, ITS EMPLOYEES, DIRECTORS,
        <br />
        <br />
        SHAREHOLDERS, OFFICERS, AGENTS, AND REPRESENTATIVES, WHETHER A COVID-19 INFECTION OCCURS
        BEFORE, DURING, OR AFTER PARTICIPATION IN ANY SESSIONS.
        <br />
        <br />
        <span className="term">S. Acceptance of Terms</span>
        <br />
        <br />
        By using the Website or App, purchasing a Session, making a Reservation, participating in
        the Activities or using the Facilities, you signify your acceptance of these Terms. If you
        do not agree to this, please refrain from using the Website or App, purchasing a Session,
        making a Reservation, participating in the Activities and/or using the Facilities.
        <br />
        <br />
        Occasional changes may be made to this document to reflect changes in Crosscourt’s policies.
        These Terms may be revised at any time by updating this posting. By using the Website or
        App, purchasing a Session, making a Reservation, participating in the Activities and/or
        using the Facilities, you agree to be bound by any such revisions. You are encouraged to
        check this document periodically to stay informed of current guidelines.
        <br />
        <br />
        <span className="term">
          T. Contact UsIf you have any questions about these Terms you can reach us at
          ccteam@cross-court.com
        </span>
      </div>
    </PageContainer>
  );
};

export default TermsAndConditions;
