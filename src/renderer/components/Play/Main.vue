<template>
	<v-dialog v-model="PlayState.isVisible" fullscreen>
		<v-card color="background">
			<PlayToolbar />

			<canvas v-if="isCanvasPlayer" ref="canvas" />
			<span v-else-if="PlayState.player === 'entity'">Entity Simulator... Yay!</span>
		</v-card>
	</v-dialog>
</template>

<script>
import { PlayState, CanvasPlayers } from '../../scripts/Play/state'
import { createClientEntity } from '../../scripts/Play/ClientEntity/create'
import PlayToolbar from './Toolbar'

export default {
	name: 'PlayScreen',
	props: {
		filePath: String,
	},
	components: {
		PlayToolbar,
	},
	data: () => ({
		PlayState,
	}),
	mounted() {
		if (PlayState.player === 'client_entity')
			createClientEntity(this.filePath)
	},

	computed: {
		isCanvasPlayer() {
			return CanvasPlayers.includes(PlayState.player)
		},
	},
}
</script>

<style></style>
