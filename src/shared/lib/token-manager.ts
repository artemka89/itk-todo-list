class TokenManager {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  clearToken = () => {
    localStorage.removeItem(this.accessTokenKey);
  };

  set accessToken(newToken: string | null) {
    if (newToken) {
      localStorage.setItem(this.accessTokenKey, newToken);
    }
  }

  set refreshToken(newToken: string | null) {
    if (newToken) {
      localStorage.setItem(this.refreshTokenKey, newToken);
    }
  }

  get refreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  get accessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  get isExpired() {
    const token = this.accessToken;
    if (!token) {
      console.warn('Token is missing');
      return false;
    }

    const tokenParts = token.split('.');
    const currentTime = Date.now();

    if (tokenParts.length !== 3) {
      console.error('Invalid token format: Token must have 3 parts');
      return currentTime >= 0;
    }

    try {
      // Преобразуем Base64Url в стандартный Base64
      const base64Url = tokenParts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const paddedBase64 = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        '='
      );

      // Декодируем Base64
      const binaryString = atob(paddedBase64);

      // Преобразуем бинарную строку в массив байт
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Декодируем массив байт в строку UTF-8 и парсим JSON
      const decodedPayload = JSON.parse(new TextDecoder('utf-8').decode(bytes));

      if (decodedPayload.exp) {
        return currentTime >= decodedPayload.exp * 1000;
      } else {
        console.error('Token payload does not contain "exp" field');
        return false;
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      return true;
    }
  }
}

export const tokenManager = new TokenManager();
