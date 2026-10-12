import Page from '@/components/shared/Page';
import { seo } from '@/lib/seo';

export const metadata = seo();

export default function PrivacyPolicyPage() {
  return (
    <Page>
      <h3>Privacy Policy</h3>

        <p>
          The personal data of our users is one of the matters to which we pay extreme attention. We make sure that all
          requirements are not only met, but, if possible, exceeded, as we are aware of the sensitive nature of this matter.
        </p>
        <p>
          In accordance with the{' '}
          <a href="https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina?urlid=200794&stevilka=4690" target="_blank">
            Personal Data Protection Act (ZVOP-1-UPB1)
          </a>
          , the administrator of the datavallis.com website is obliged to protect the personal data of its users.
        </p>
        <p>For business purposes, datavallis.com collects the following user data:</p>

        <ul>
          <li>name and surname,</li>
          <li>e-mail address,</li>
          <li>and other information that users enter in the contact form on the datavallis.com website.</li>
        </ul>

        <p>We are not responsible for the accuracy of the information entered by users.</p>
        <p>
          For security purposes, IP addresses from which users access the website are also collected. At the beginning of the
          website visit, each user is assigned a session cookie for identification. datavallis.com may also store other
          cookies on your computer, such as: user identification number in encrypted form (to identify the user on the next
          visit), Facebook Pixel cookies and Google Analytics cookies (analysis of website visits).
        </p>
        <p>
          All mentioned data, except cookies, are stored permanently on the datavallis.com server. Session cookies are stored
          in the server’s memory only for the duration of the visit and are deleted after one hour of inactivity, while
          persistent cookies are stored on the visitor's computer. The administrator of datavallis.com may use the data in an
          anonymised summary form for the purposes of statistical analysis. datavallis.com will in no case hand over user data
          to unauthorized persons. We will contact the user via means of distance communication only if the user does not
          explicitly object to this.
        </p>

        <h5>Exceptional disclosure of personal information</h5>
        <p>
          The data collected and processed by datavallis.com will only be disclosed if such an obligation is provided by law,
          or in good faith that such action is necessary for proceedings before courts or other state authorities and for the
          protection and pursuit of legitimate interests of datavallis.com.
        </p>
    </Page>
  );
}
