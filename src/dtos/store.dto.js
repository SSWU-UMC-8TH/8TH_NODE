export const bodyToStore = (body) => {
    const { regionId, name, address, score } = body;
  
    // 기본값 설정 또는 형식 검증도 가능
    if (!regionId || !name || !address) {
      throw new Error("regionId, name, address는 필수입니다.");
    }
  
    return {
      regionId: Number(regionId),
      name: String(name),
      address: String(address),
      score: score !== undefined ? parseFloat(score) : 0.0,
    };
  };
  