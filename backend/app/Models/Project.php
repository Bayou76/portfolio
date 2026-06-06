<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'description', 'url', 'image',
        'technologies', 'featured', 'order'
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured' => 'boolean',
    ];
}