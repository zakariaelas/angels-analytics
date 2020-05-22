import axios from 'axios';
import qs from 'query-string';
import { saveAs } from 'file-saver';

//function used to export the data to a csv after making an api call
//file-saver is used to prompt the user to download the file.
export async function exportToCSV(filters) {
  try {
    const url = qs.stringifyUrl({
      url: process.env.REACT_APP_URL,
      query: { ...filters, csv: true },
    });
    const token = btoa(
      `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`,
    );
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'blob',
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const filename =
      response.headers['Content-Disposition'] || 'meter-report.csv';
    saveAs(response.data, filename);
  } catch (err) {
    console.err(err);
  }
}
