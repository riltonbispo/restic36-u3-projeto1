import { Agent } from "./types/agents";

const getAgentIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

const getAgentDetails = async (uuid: string) => {
  const url = `https://valorant-api.com/v1/agents/${uuid}`;
  const response = await fetch(url);
  const agent = await response.json();
  return agent.data;
}

const renderAgentDetails = (agent: Agent) => {
  const container = document.getElementById('agent-details');

  if (!container) return;

  container.innerHTML = `
    <img src="${agent.bustPortrait}" alt="${agent.displayName}">
    <div>  
      <h1>${agent.displayName}</h1>
      <p>${agent.description}</p>
      <a href="./index.html" class="button-35">Voltar</a>
    </div>
  `;
}

const loadAgentDetails = async () => {
  const agentId = getAgentIdFromUrl();

  if (agentId) {
    const agent = await getAgentDetails(agentId);
    renderAgentDetails(agent);
  }
}

loadAgentDetails();