import Page from '@/components/shared/Page';
import TLink from '@/components/shared/TLink';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Legal Notice | DATA VALLIS',
  description: 'Company details, terms of use, liability and intellectual property for datavallis.com - DATA VALLIS d.o.o., Maribor, Slovenia.',
  path: '/legal-notice',
});

export default function LegalNoticePage() {
  return (
    <Page>
      <h3>Legal Notice</h3>

        <h5>Terms of Use</h5>
        <p>
          By entering and viewing any part of the datavallis.com website, you agree to all of the restrictions and terms of
          use set forth herein. If you do not agree, please do not use this site. We recommend that you occasionally review
          the applicable Terms of Use or Privacy Policy.
        </p>

        <h5>Legal Body</h5>
        <p>
          Website owner information: <br />
          DATA VALLIS d.o.o.<br />
          Ulica Šercerjeve brigade 5, 2000 Maribor, Slovenia<br />
          E-mail: <a href="mailto:info@datavallis.com">info@datavallis.com</a> <br />
          Phone: +386 (0) 6 960 7847 <br />
          VAT No.: SI89424999<br />
          Reg. No.: 8552967000<br />
          IBAN: SI56 6100 0002 3306 925 (Delavska Hranilnica d.d. Ljubljana)<br />
        </p>

        <h5>Limitation of Liability</h5>
        <p>
          datavallis.com edits websites with due diligence. Nevertheless, it assumes no responsibility for their accuracy and
          completeness. It reserves the right to change the content of this website at any time and in any way, for any reason
          and without prior notice. All users use all published content at their own risk. Therefore datavallis.com or any
          legal or natural person who has participated in the preparation and production of these websites shall in no case be
          liable for any damage arising out of or in connection with access to, use of or inability to use the information on
          these websites, or for any errors or omissions in their content.
        </p>

        <h5>Intellectual Property Rights</h5>
        <p>
          All information and images on the websites of DATA VALLIS d.o.o. are subject to copyright or other forms of
          intellectual property protection within the legally permitted framework. Some of the images are the property of DATA
          VALLIS d.o.o., others were obtained from Shutterstock, Pexels, Unsplash, Pixabay etc. The documents on this website
          may only be reproduced for non-commercial purposes and for personal use, provided that all copyright or other
          notices are stated. Copying, reproducing, modifying or otherwise disseminating the information from these websites
          for commercial purposes is without the express written consent of DATA VALLIS d.o.o. Prohibited.
        </p>

        <h5>Privacy Protection</h5>
        <p>Learn more about protection and privacy policy <TLink href="/privacy-policy">here</TLink>.</p>

        <h5>Cookies</h5>
        <p>You can find out more about the use of cookies on our website at this <TLink href="/cookies">link</TLink>.</p>

        <h5>Security</h5>
        <p>
          DATA VALLIS d.o.o. uses technical and organizational security measures to protect your data from tampering, loss,
          destruction or unauthorized access. We also use a standard firewall and password protection to ensure the security
          and confidentiality of personal information we collect online. When we handle your personal information, we take
          steps designed to protect that information from loss, misuse, unauthorized access, disclosure, alteration or
          destruction. Nevertheless, we cannot protect the data from any loss, improper use, unauthorized access, disclosure,
          alteration or destruction in all cases possible, but we strive to prevent such unfortunate events.
        </p>

        <h5>Contact Us</h5>
        <p>
          In case of problems, questions, insight, correction, blocking and deletion of your personal data, please contact us:
          DATA VALLIS d.o.o., Ulica Šercerjeve brigade 5, 2000 Maribor, Slovenia; e-mail:{' '}
          <a href="mailto:info@datavallis.com">info@datavallis.com</a>, phone: +386 (0) 6 960 7847.
        </p>
        <p>
          The constant development of the web requires our legal notice to be changed from time to time. We reserve the right
          to make these changes.
        </p>
        <p>The operator of this website is DATA VALLIS d.o.o.</p>
    </Page>
  );
}
