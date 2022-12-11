import moment from 'moment';

/**
 * 下载图片
 * @param img
 */
export const downloadImage = (img: string) => {
  let aTag = document.createElement('a');
  aTag.setAttribute('href', img);
  aTag.setAttribute('download', `${Date.now()}.png`);
  aTag.style.display = 'none';
  document.body.appendChild(aTag);
  aTag.click();
};

/**
 * 下载内容
 * @param text
 * @param ext
 */
export const downloadText = (text: string, ext: string | 'json' | 'txt') => {
  let aTag = document.createElement('a');
  aTag.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
  );
  aTag.setAttribute(
    'download',
    `${moment().format('YYYY-HH-MM HH:mm:ss')}.${ext}`,
  );
  aTag.style.display = 'none';
  document.body.appendChild(aTag);
  aTag.click();
};
