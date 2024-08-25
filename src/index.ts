
import { Agent } from './types/agents'

let agents: Agent[] | null = null;

async function getData() {
  const url = "https://valorant-api.com/v1/agents";
  const response = await fetch(url);
  const json = await response.json();
  agents = json.data
  agents && renderAgents(agents)
}

const renderAgents = (agents: Agent[]) => {
  const container = document.getElementById('agent-container');

  agents.forEach(agent => {
    const agentDiv = document.createElement('div');
    agentDiv.classList.add('agent');

    const agentLink = document.createElement('a');
    agentLink.href = `agent.html?id=${agent.uuid}`;
    agentLink.classList.add('agent__link');

    const agentImage = document.createElement('img');
    agentImage.src = agent.displayIcon;
    agentImage.alt = agent.displayName;
    agentImage.classList.add('agent__image');

    const agentTitle = document.createElement('h2');
    agentTitle.classList.add('agent__title');
    agentTitle.textContent = agent.displayName;

    agentImage.addEventListener('mouseenter', () => {
      const gradientColor = '#' + agent.backgroundGradientColors[0]
      document.documentElement.style.setProperty('--bg-color', gradientColor);
    });

    agentLink.appendChild(agentImage);
    agentLink.appendChild(agentTitle);
    agentDiv.appendChild(agentLink);
    container?.appendChild(agentDiv);
  })
}


getData()
