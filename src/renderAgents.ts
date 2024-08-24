import { Agent } from "./types/agents";

const getAgentIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  console.log(params.get('id'))
  return params.get('id');
}

const getAgentDetails = async (uuid: string) => {
  const url = `https://valorant-api.com/v1/agents/${uuid}`;
  const response = await fetch(url);
  const agent = await response.json();
  console.log(agent)
  return agent.data;
}

const renderAgentDetails = (agent: Agent) => {
  const container = document.getElementById('agent-details');

  if (!container) return;

  container.innerHTML = `
    <h1>${agent.displayName}</h1>
    <img src="${agent.bustPortrait}" alt="${agent.displayName}">
    <p>${agent.description}</p>
    <!-- Adicione outros detalhes conforme necessário -->
  `;
}

const loadAgentDetails = async() => {
  const agentId = getAgentIdFromUrl();
  if (agentId) {
    const agent = await getAgentDetails(agentId);
    renderAgentDetails(agent);
  } else {
    console.error('Agent ID not found in URL');
  }
}

loadAgentDetails();