import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';

function onCancel() {
    p.cancel('Operation cancelled.');
    process.exit(0);
}

async function displayIntro() {
    console.clear();
    await setTimeout(1000);
    p.intro(`${color.bgCyan(color.black(' XOS Bootstrap '))}`);
}

async function bootstrapChoices(choices) {
    if (!choices.confirmInstall) return;

    const s = p.spinner();
    s.start('Bootstrapping XOS...');

    await setTimeout(2500);
    s.stop('XOS bootstrapped successfully.');
}

function displayOutro() {
    p.outro(`Welcome to ${color.cyan('XOS')}! Enjoy your tailored experience.`);
}

async function handleThemeSelection() {
    const themes = await p.groupMultiselect({
        message: 'Select your preferred theme:',
        options: {
            'Dracula': [
                { value: 'dracula-gtk', label: 'GTK Theme' },
                { value: 'dracula-cursor', label: 'Cursor Theme' },
                { value: 'dracula-icons', label: 'Icon Theme' },
            ],
            'Nord': [
                { value: 'nord-gtk', label: 'GTK Theme' },
                { value: 'nord-cursor', label: 'Cursor Theme' },
                { value: 'nord-icons', label: 'Icon Theme' },
            ],
            'Gruvbox': [
                { value: 'gruvbox-gtk', label: 'GTK Theme' },
                { value: 'gruvbox-cursor', label: 'Cursor Theme' },
                { value: 'gruvbox-icons', label: 'Icon Theme' },
            ],
        },
    });

    return themes;
}

async function handleDEWMSelection() {
    const environments = await p.groupMultiselect({
        message: 'Select your preferred Desktop Environment or Window Manager:',
        options: {
            'GNOME': [
                { value: 'gnome-tweaks', label: 'GNOME Tweaks' },
                { value: 'gnome-terminal', label: 'GNOME Terminal' },
                { value: 'nautilus', label: 'Nautilus File Manager' },
            ],
            'i3': [
                { value: 'i3status', label: 'i3status' },
                { value: 'i3blocks', label: 'i3blocks' },
                { value: 'i3lock', label: 'i3lock' },
            ],
        },
    });

    return environments;
}

async function handleTerminalsSelection() {
    return p.multiselect({
        message: 'Select your desired terminals:',
        initialValues: ['kitty', 'st'],
        options: [
            { value: 'kitty', label: 'Kitty' },
            { value: 'st', label: 'Simple Terminal (ST)' },
            { value: 'alacritty', label: 'Alacritty' },
            { value: 'urxvt', label: 'URxvt' },
        ],
    });
}

async function handleEditorsSelection() {
    return p.multiselect({
        message: 'Select your desired text editors:',
        initialValues: ['vim'],
        options: [
            { value: 'vim', label: 'Vim' },
            { value: 'vscode', label: 'VS Code' },
            { value: 'neovim', label: 'NeoVim' },
            { value: 'emacs', label: 'Emacs' },
        ],
    });
}

async function handleBrowsersSelection() {
    return p.multiselect({
        message: 'Select your desired browsers:',
        initialValues: ['firefox'],
        options: [
            { value: 'firefox', label: 'Firefox' },
            { value: 'chrome', label: 'Google Chrome' },
            { value: 'brave', label: 'Brave' },
            { value: 'edge', label: 'Microsoft Edge' },
        ],
    });
}

async function main() {
    await displayIntro();

    const choices = await p.group(
        {
            terminals: handleTerminalsSelection,
            editors: handleEditorsSelection,
            themes: handleThemeSelection,
            desktopEnvironments: handleDEWMSelection,
            browsers: handleBrowsersSelection,
            confirmInstall: () => p.confirm({
                message: 'Confirm and start bootstrapping?',
                initialValue: true,
            }),
        },
        { onCancel }
    );

    await bootstrapChoices(choices);
    displayOutro();
}

main().catch(error => {
    console.error('An error occurred:', error);
});











// import * as p from '@clack/prompts';
// import { setTimeout } from 'node:timers/promises';
// import color from 'picocolors';
//
// function onCancel() {
// 	p.cancel('Operation cancelled.');
// 	process.exit(0);
// }
//
// async function handleThemeSelection() {
// 	const themes = await p.groupMultiselect({
// 		message: 'Select your preferred theme:',
// 		options: {
// 			'Dracula': [
// 				{ value: 'dracula-gtk', label: 'GTK Theme' },
// 				{ value: 'dracula-cursor', label: 'Cursor Theme' },
// 				{ value: 'dracula-icons', label: 'Icon Theme' },
// 			],
// 			'Nord': [
// 				{ value: 'nord-gtk', label: 'GTK Theme' },
// 				{ value: 'nord-cursor', label: 'Cursor Theme' },
// 				{ value: 'nord-icons', label: 'Icon Theme' },
// 			],
// 			'Gruvbox': [
// 				{ value: 'gruvbox-gtk', label: 'GTK Theme' },
// 				{ value: 'gruvbox-cursor', label: 'Cursor Theme' },
// 				{ value: 'gruvbox-icons', label: 'Icon Theme' },
// 			],
// 		},
// 		onSelect: (choice, results) => {
// 			// If a parent theme is selected, auto-select all its children
// 			if (['Dracula', 'Nord', 'Gruvbox'].includes(choice.value)) {
// 				return results[choice.value] = choice.options.map(opt => opt.value);
// 			}
// 			// If all children of a theme are selected, auto-select the parent theme
// 			const allChildren = choice.options.map(opt => opt.value);
// 			if (allChildren.every(val => results[choice.label].includes(val))) {
// 				results[choice.label] = allChildren;
// 			}
// 		},
// 	});
//
// 	return themes;
// }
//
//
//
//
// async function handleDEWMSelection() {
// 	const environments = await p.groupMultiselect({
// 		message: 'Select your preferred Desktop Environment or Window Manager:',
// 		options: {
// 			'GNOME': [
// 				{ value: 'gnome-tweaks', label: 'GNOME Tweaks' },
// 				{ value: 'gnome-terminal', label: 'GNOME Terminal' },
// 				{ value: 'nautilus', label: 'Nautilus File Manager' },
// 			],
// 			'i3': [
// 				{ value: 'i3status', label: 'i3status' },
// 				{ value: 'i3blocks', label: 'i3blocks' },
// 				{ value: 'i3lock', label: 'i3lock' },
// 			],
// 			//... add more DEs and WMs here
// 		},
// 		onSelect: (choice, results) => {
// 			// If a parent DE/WM is selected, auto-select all its associated software
// 			if (['GNOME', 'i3'].includes(choice.value)) {
// 				return results[choice.value] = choice.options.map(opt => opt.value);
// 			}
// 			// If all software of a DE/WM are selected, auto-select the parent DE/WM
// 			const allChildren = choice.options.map(opt => opt.value);
// 			if (allChildren.every(val => results[choice.label].includes(val))) {
// 				results[choice.label] = allChildren;
// 			}
// 		},
// 	});
//
// 	return environments;
// }
//
//
// async function main() {
// 	console.clear();
//
// 	await setTimeout(1000);
//
// 	p.intro(`${color.bgCyan(color.black(' XOS Bootstrap '))}`);
//
// 	const choices = await p.group(
// 		{
// 			terminals: () =>
// 				p.multiselect({
// 					message: 'Select your desired terminals:',
// 					initialValues: ['kitty', 'st'],
// 					options: [
// 						{ value: 'kitty', label: 'Kitty', hint: 'preselected' },
// 						{ value: 'st', label: 'Simple Terminal (ST)', hint: 'preselected' },
// 						{ value: 'alacritty', label: 'Alacritty' },
// 						{ value: 'urxvt', label: 'URxvt' },
// 					],
// 				}),
// 			editors: () =>
// 				p.multiselect({
// 					message: 'Select your desired text editors:',
// 					initialValues: ['vim'],
// 					options: [
// 						{ value: 'vim', label: 'Vim', hint: 'preselected' },
// 						{ value: 'vscode', label: 'VS Code' },
// 						{ value: 'neovim', label: 'NeoVim' },
// 						{ value: 'emacs', label: 'Emacs' },
// 					],
// 				}),
// 			themes: () => handleThemeSelection(),
// 			desktopEnvironments: () => handleDEWMSelection(),
// 			browsers: () =>
// 				p.multiselect({
// 					message: 'Select your desired browsers:',
// 					initialValues: ['firefox'],
// 					options: [
// 						{ value: 'firefox', label: 'Firefox', hint: 'preselected' },
// 						{ value: 'chrome', label: 'Google Chrome' },
// 						{ value: 'brave', label: 'Brave' },
// 						{ value: 'edge', label: 'Microsoft Edge' },
// 					],
// 				}),
// 			confirmInstall: () =>
// 				p.confirm({
// 					message: 'Confirm and start bootstrapping?',
// 					initialValue: true,
// 				}),
// 		},
// 		{
// 			onCancel,
// 		}
// 	);
//
// 	if (choices.confirmInstall) {
// 		const s = p.spinner();
// 		s.start('Bootstrapping XOS...');
//
// 		// TODO: Implement installation logic based on selected choices.
//
// 		await setTimeout(2500); // Placeholder for now
// 		s.stop('XOS bootstrapped successfully.');
// 	}
//
// 	p.outro(`Welcome to ${color.cyan('XOS')}! Enjoy your tailored experience.`);
// }
//
// main().catch(console.error);
