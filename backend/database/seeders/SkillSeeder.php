<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            ['name' => 'HTML / CSS',    'category' => 'frontend', 'level' => 90, 'order' => 1],
            ['name' => 'JavaScript',    'category' => 'frontend', 'level' => 85, 'order' => 2],
            ['name' => 'React',         'category' => 'frontend', 'level' => 85, 'order' => 3],
            ['name' => 'Redux',         'category' => 'frontend', 'level' => 75, 'order' => 4],
            ['name' => 'API REST',      'category' => 'frontend', 'level' => 80, 'order' => 5],
            ['name' => 'PHP',           'category' => 'backend',  'level' => 70, 'order' => 6],
            ['name' => 'MySQL',         'category' => 'backend',  'level' => 70, 'order' => 7],
            ['name' => 'Python',        'category' => 'backend',  'level' => 50, 'order' => 8],
            ['name' => 'Git / GitHub',  'category' => 'devops',   'level' => 80, 'order' => 9],
            ['name' => 'Docker',        'category' => 'devops',   'level' => 60, 'order' => 10],
            ['name' => 'Figma',         'category' => 'outils',   'level' => 75, 'order' => 11],
            ['name' => 'VS Code',       'category' => 'outils',   'level' => 90, 'order' => 12],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}