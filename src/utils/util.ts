import Resizer from 'react-image-file-resizer'

export const resizeFile = (file: Blob): Promise<string> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1200,
      1200,
      'JPEG',
      50,
      0,
      (uri) => {
        resolve(uri as string)
      },
      'file'
    )
  })
}


export const textToLink = (comment: string) => {
  const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
  let linkedComment = comment.replace(regexp_url, '<a class="hash" href="$1" blank_="true">$1</a>');

  const newline = /\r\n|\n/g;
  linkedComment = linkedComment.replace(
    newline,
    '<br />'
  );

  const space = "　";
  linkedComment = linkedComment.replace(
    space,
    ' '
  );

  return linkedComment;
}