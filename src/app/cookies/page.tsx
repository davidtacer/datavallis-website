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
              <td>_ga</td>
              <td>Google Analytics 4 - distinguishes unique visitors</td>
              <td>2 years</td>
              <td>.datavallis.com</td>
            </tr>
            <tr>
              <td>_ga_&lt;ID&gt;</td>
              <td>Google Analytics 4 - keeps the session state</td>
              <td>2 years</td>
              <td>.datavallis.com</td>
            </tr>
            </tbody>
        </table>
    </Page>
  );
}
