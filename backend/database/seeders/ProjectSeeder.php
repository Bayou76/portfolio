<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title'        => 'Site vitrine Délices Pizzas',
                'description'  => 'Conception et développement d\'un site vitrine complet pour une pizzeria. Cahier des charges, intégration front-end et nouvelles fonctionnalités back-end.',
                'url'          => 'https://github.com/Bayou76',
                'technologies' => ['HTML', 'CSS', 'JavaScript', 'PHP'],
                'featured'     => true,
                'order'        => 1,
            ],
            [
                'title'        => 'Projets React — Composants dynamiques',
                'description'  => 'Développement de composants React dynamiques avec gestion d\'état, hooks et intégration d\'API REST.',
                'url'          => 'https://github.com/Bayou76',
                'technologies' => ['React', 'Redux', 'API REST', 'JavaScript'],
                'featured'     => true,
                'order'        => 2,
            ],
            [
                'title'        => 'Portfolio personnel',
                'description'  => 'Portfolio full-stack en cours de création avec Laravel, React et Docker. Déploiement sur GitHub Pages.',
                'url'          => 'https://github.com/Bayou76',
                'technologies' => ['React', 'Laravel', 'Docker', 'MySQL', 'Tailwind'],
                'featured'     => true,
                'order'        => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}