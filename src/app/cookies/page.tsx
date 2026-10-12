import Page from '@/components/shared/Page';
import { seo } from '@/lib/seo';

export const metadata = seo();

export default function CookiesPage() {
  return (
    <Page>
      <h3>Cookies</h3>
        <p>
          We use cookies to make our website easier to use and more enjoyable. Cookies are small data units that allow us to
          compare new and previous visitors, and understand how they use our site. They provide us with information that can
          make future visits of the website more pleasant and efficient. If you do not want to use cookies, set your computer
          to delete all cookies on the website and or to warn you before the cookie is saved to the disk. If you do not want
          to change the use of cookies, simply continue to the website.
        </p>
        <p>
          For more information on cookies and their impact see{' '}
          <a href="http://www.aboutcookies.org" target="_blank">http://www.aboutcookies.org</a>.
        </p>

        <h5>Types of cookies we use</h5>
        <table>
          <tbody>
          <tr>
            <th>Cookie name</th>
            <th>Purpose</th>
            <th>Cookie time</th>
            <th>Website</th>
          </tr>
          <tr>
            <td>NID</td>
            <td>Google settings ID</td>
            <td>Until the end of the session</td>
            <td>.google.com</td>
          </tr>
          <tr>
            <td>_ga</td>
            <td>Website viewing statistics</td>
            <td>2 years</td>
            <td>.datavallis.com</td>
          </tr>
          <tr>
            <td>_gid</td>
            <td>Website viewing statistics</td>
            <td>1 day</td>
            <td>.datavallis.com</td>
          </tr>
          <tr>
            <td>_gat</td>
            <td>Website viewing statistics</td>
            <td>10 minutes</td>
            <td>.datavallis.com</td>
          </tr>
          <tr>
            <td>_gat_gtag_UA_128373629_1</td>
            <td>Website viewing statistics</td>
            <td>1 day</td>
            <td>.datavallis.com</td>
          </tr>
            </tbody>
        </table>
    </Page>
  );
}
