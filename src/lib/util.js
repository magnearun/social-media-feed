export function resizeImageWithTimThumb (timThumbUrl, imageUrl, width, height) {
  var newUrl = `http://apptest.umbrotsstofan.is/TimThumb/timthumb.php?src=${imageUrl}`;
  if (width || height) {
    newUrl += '&';
      if (width) {
        newUrl += `w=${width}`;
        if (height) {
          newUrl += '&';
        }
      }
      if (height) {
        newUrl += `h=${height}`;
      }

      newUrl += '.jpg';

      return newUrl;
    }
}
