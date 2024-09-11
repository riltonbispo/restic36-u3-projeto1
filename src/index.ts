import { Agent } from './types/agents'

let agents: Agent[] | null = null;

async function getData() {
  const url = "https://valorant-api.com/v1/agents";
  const response = await fetch(url);
  const json = await response.json();
  agents = json.data;
  agents && renderAgents(agents);
}

const renderAgents = (agents: Agent[]) => {
  const container = document.getElementById('agent-container');

  if (container) {
    let agentsHTML = '';

    agents.forEach(agent => {
      agentsHTML += `
        <div class="agent">
          <a href="agent.html?id=${agent.uuid}" class="agent__link">
            <img 
              src="${agent.displayIcon}" 
              alt="${agent.displayName}" 
              class="agent__image" 
              data-bgcolor="${agent.backgroundGradientColors[0]}"
            />
            <h2 class="agent__title">${agent.displayName}</h2>
          </a>
        </div>
      `;
    });

    container.innerHTML = agentsHTML;

    const agentImages = container.querySelectorAll('.agent__image')
    
    agentImages.forEach(image => {
      image.addEventListener('mouseenter', () => {
        const gradientColor = '#' + image.getAttribute('data-bgcolor');
        document.documentElement.style.setProperty('--bg-color', gradientColor);
      });
    });
  }
}

getData();
