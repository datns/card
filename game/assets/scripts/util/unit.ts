import Engine from '@metacraft/murg-engine';
import { Label } from 'cc';

import { getPositiveColor } from '../util/helper';

import { system } from './system';

const {
	getCard,
	getCardState,
	getFacingIdentifier,
	getStateAfterCombat,
	extractPassivePair,
	combineAttribute,
} = Engine;

export const updateGroundUnits = (): void => {
	system.duel.firstGround.forEach(updateUnit);
	system.duel.secondGround.forEach(updateUnit);
};

export const updateUnit = async (cardId: string): Promise<void> => {
	const node = system.cardRefs[cardId];

	if (!node) return;

	const card = getCard(system.duel.cardMap, cardId);
	const state = getCardState(system.duel.stateMap, cardId);
	const facingIdentifier = getFacingIdentifier(
		system.duel,
		state.owner,
		state.id,
	);
	const [passive] = extractPassivePair(
		system.duel,
		cardId,
		facingIdentifier?.id,
	);
	const { health, defense, attack } = combineAttribute(state, passive);
	const healthNode = node.getChildByPath('front/health');
	const healthLabel = healthNode.getComponent(Label);
	const defenseNode = node.getChildByPath('front/defense');
	const defenseLabel = defenseNode.getComponent(Label);
	const attackNode = node.getChildByPath('front/attack');
	const attackLabel = attackNode.getComponent(Label);
	const chargeLabel = node
		.getChildByPath('front/charge/value')
		.getComponent(Label);
	const deathPredictNode = node.getChildByPath('death');
	const healthPredictNode = node.getChildByPath('prediction/health');
	const healthPredictLabel = healthPredictNode.getComponent(Label);
	const defensePredictNode = node.getChildByPath('prediction/defense');
	const defensePredictLabel = defensePredictNode.getComponent(Label);
	const attackPredictNode = node.getChildByPath('prediction/attack');
	const attackPredictLabel = attackPredictNode.getComponent(Label);

	healthLabel.string = String(health);
	healthLabel.color = getPositiveColor(health, card.attribute.health);
	defenseLabel.string = String(defense);
	defenseLabel.color = getPositiveColor(defense, card.attribute.defense);
	attackLabel.string = String(attack);
	attackLabel.color = getPositiveColor(attack, card.attribute.attack);

	if (state.charge) {
		chargeLabel.string = String(state.charge);
	}

	defensePredictNode.active = false;
	defensePredictNode.active = false;
	healthPredictNode.active = false;
	defensePredictNode.active = false;
	attackPredictNode.active = false;
	deathPredictNode.active = false;

	const facingNode = system.cardRefs[facingIdentifier?.id];
	const nodeHided = node.getChildByPath('back')?.active;
	const facingHided = facingNode?.getChildByPath('back')?.active;

	if (!facingNode || nodeHided || facingHided) return;

	const facingState = getCardState(system.duel.stateMap, facingIdentifier?.id);
	const predictedState = getStateAfterCombat(
		system.duel,
		state.id,
		facingState.id,
	);
	const combinedPredict = combineAttribute(predictedState, passive);

	const healthDiff = combinedPredict.health - health;
	const defenseDiff = combinedPredict.defense - defense;
	const attackDiff = combinedPredict.attack - attack;

	if (combinedPredict.health <= 0) {
		deathPredictNode.active = true;
	}

	if (healthDiff === 0) {
		healthPredictNode.active = false;
	} else {
		healthPredictNode.active = true;
		healthPredictLabel.string = String(healthDiff);
		healthPredictLabel.color = getPositiveColor(healthDiff);
	}

	if (defenseDiff === 0) {
		defensePredictNode.active = false;
	} else {
		defensePredictNode.active = true;
		defensePredictLabel.string = String(defenseDiff);
		defensePredictLabel.color = getPositiveColor(defenseDiff);
	}

	if (attackDiff === 0) {
		attackPredictNode.active = false;
	} else {
		attackPredictNode.active = true;
		attackPredictLabel.string = String(attackDiff);
		attackPredictLabel.color = getPositiveColor(attackDiff);
	}
};
