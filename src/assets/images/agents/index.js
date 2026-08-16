import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';

export const agentImages = [image1, image2, image3];

export const getAgentImage = (index = 0) => agentImages[index % agentImages.length];
